/**
 * Minimal, zero-dependency ISO/IEC 18004 QR Code matrix generator (Byte mode, ECC Level M)
 * Supports payloads up to ~180 UTF-8 bytes cleanly (covers URLs, wa.me links, and UPI intents).
 */

const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
})();

function gfMul(a, b) {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function rsGeneratorPoly(deg) {
  let poly = [1];
  for (let i = 0; i < deg; i++) {
    const next = new Array(poly.length + 1).fill(0);
    const root = GF_EXP[i];
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], root);
    }
    poly = next;
  }
  return poly;
}

function rsRemainder(data, ecCount) {
  const gen = rsGeneratorPoly(ecCount);
  const res = new Uint8Array(data.length + ecCount);
  res.set(data);
  for (let i = 0; i < data.length; i++) {
    const factor = res[i];
    if (factor !== 0) {
      for (let j = 0; j < gen.length; j++) {
        res[i + j] ^= gfMul(gen[j], factor);
      }
    }
  }
  return res.slice(data.length);
}

// Level M capacity & EC block specs for versions 1..10
const VERSION_SPECS = {
  1:  { total: 26,  ecPerBlock: 10, g1Blocks: 1, g1Data: 16, g2Blocks: 0, g2Data: 0, align: [] },
  2:  { total: 44,  ecPerBlock: 16, g1Blocks: 1, g1Data: 28, g2Blocks: 0, g2Data: 0, align: [6, 18] },
  3:  { total: 70,  ecPerBlock: 26, g1Blocks: 1, g1Data: 44, g2Blocks: 0, g2Data: 0, align: [6, 22] },
  4:  { total: 100, ecPerBlock: 18, g1Blocks: 2, g1Data: 32, g2Blocks: 0, g2Data: 0, align: [6, 26] },
  5:  { total: 134, ecPerBlock: 24, g1Blocks: 2, g1Data: 43, g2Blocks: 0, g2Data: 0, align: [6, 30] },
  6:  { total: 172, ecPerBlock: 16, g1Blocks: 4, g1Data: 27, g2Blocks: 0, g2Data: 0, align: [6, 34] },
  7:  { total: 196, ecPerBlock: 18, g1Blocks: 4, g1Data: 31, g2Blocks: 0, g2Data: 0, align: [6, 22, 38] },
  8:  { total: 242, ecPerBlock: 22, g1Blocks: 2, g1Data: 38, g2Blocks: 2, g2Data: 39, align: [6, 24, 42] },
  9:  { total: 292, ecPerBlock: 22, g1Blocks: 3, g1Data: 36, g2Blocks: 2, g2Data: 37, align: [6, 26, 46] },
  10: { total: 346, ecPerBlock: 26, g1Blocks: 4, g1Data: 43, g2Blocks: 1, g2Data: 44, align: [6, 28, 50] },
};

function getBCHFormat(formatBits) {
  let d = formatBits << 10;
  const poly = 0x537;
  for (let i = 14; i >= 10; i--) {
    if ((d >> i) & 1) d ^= poly << (i - 10);
  }
  return ((formatBits << 10) | d) ^ 0x5412;
}

function getBCHVersion(version) {
  let d = version << 12;
  const poly = 0x1f25;
  for (let i = 17; i >= 12; i--) {
    if ((d >> i) & 1) d ^= poly << (i - 12);
  }
  return (version << 12) | d;
}

export function generateQrMatrix(text) {
  const bytes = new TextEncoder().encode(text || "https://www.prajyotinfotech.in");
  let version = 1;
  while (version <= 10) {
    const s = VERSION_SPECS[version];
    const dataCodewords = s.g1Blocks * s.g1Data + s.g2Blocks * s.g2Data;
    const lenBits = version < 10 ? 8 : 16;
    const totalBitsNeeded = 4 + lenBits + bytes.length * 8;
    if (totalBitsNeeded <= dataCodewords * 8) break;
    version++;
  }
  if (version > 10) version = 10;

  const spec = VERSION_SPECS[version];
  const dataCapacity = spec.g1Blocks * spec.g1Data + spec.g2Blocks * spec.g2Data;

  // Build bit buffer (Byte mode indicator 0100)
  const bits = [];
  const pushBits = (val, len) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };
  pushBits(0b0100, 4);
  const countBits = version < 10 ? 8 : 16;
  const cappedBytes = bytes.slice(0, dataCapacity - 3);
  pushBits(cappedBytes.length, countBits);
  for (const b of cappedBytes) pushBits(b, 8);

  const maxBits = dataCapacity * 8;
  const term = Math.min(4, maxBits - bits.length);
  for (let i = 0; i < term; i++) bits.push(0);
  while (bits.length % 8 !== 0) bits.push(0);

  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < maxBits) {
    pushBits(padBytes[padIdx % 2], 8);
    padIdx++;
  }

  const dataBytes = new Uint8Array(dataCapacity);
  for (let i = 0; i < dataCapacity; i++) {
    let val = 0;
    for (let b = 0; b < 8; b++) val = (val << 1) | bits[i * 8 + b];
    dataBytes[i] = val;
  }

  // Split into RS blocks
  const blocks = [];
  const ecBlocks = [];
  let offset = 0;
  for (let i = 0; i < spec.g1Blocks; i++) {
    const slice = dataBytes.slice(offset, offset + spec.g1Data);
    blocks.push(slice);
    ecBlocks.push(rsRemainder(slice, spec.ecPerBlock));
    offset += spec.g1Data;
  }
  for (let i = 0; i < spec.g2Blocks; i++) {
    const slice = dataBytes.slice(offset, offset + spec.g2Data);
    blocks.push(slice);
    ecBlocks.push(rsRemainder(slice, spec.ecPerBlock));
    offset += spec.g2Data;
  }

  // Interleave codewords
  const interleaved = [];
  const maxDataLen = Math.max(spec.g1Data, spec.g2Data);
  for (let i = 0; i < maxDataLen; i++) {
    for (const blk of blocks) if (i < blk.length) interleaved.push(blk[i]);
  }
  for (let i = 0; i < spec.ecPerBlock; i++) {
    for (const ec of ecBlocks) interleaved.push(ec[i]);
  }

  const size = version * 4 + 17;
  const grid = Array.from({ length: size }, () => new Int8Array(size).fill(-1));
  const reserved = Array.from({ length: size }, () => new Uint8Array(size));

  const placeFinder = (row, col) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = row + r;
        const cc = col + c;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
        const dark =
          r >= 0 && r <= 6 && c >= 0 && c <= 6 &&
          (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
        grid[rr][cc] = dark ? 1 : 0;
        reserved[rr][cc] = 1;
      }
    }
  };

  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    const bit = i % 2 === 0 ? 1 : 0;
    if (!reserved[6][i]) { grid[6][i] = bit; reserved[6][i] = 1; }
    if (!reserved[i][6]) { grid[i][6] = bit; reserved[i][6] = 1; }
  }

  // Dark module
  grid[4 * version + 9][8] = 1;
  reserved[4 * version + 9][8] = 1;

  // Alignment patterns
  const align = spec.align;
  for (const r of align) {
    for (const c of align) {
      if (reserved[r][c]) continue;
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const dark = Math.max(Math.abs(dr), Math.abs(dc)) === 2 || (dr === 0 && dc === 0);
          grid[r + dr][c + dc] = dark ? 1 : 0;
          reserved[r + dr][c + dc] = 1;
        }
      }
    }
  }

  // Reserve format & version areas
  for (let i = 0; i < 9; i++) {
    if (i !== 6) {
      reserved[8][i] = 1;
      reserved[i][8] = 1;
    }
  }
  for (let i = size - 8; i < size; i++) {
    reserved[8][i] = 1;
    reserved[i][8] = 1;
  }
  if (version >= 7) {
    const vBits = getBCHVersion(version);
    for (let i = 0; i < 18; i++) {
      const bit = (vBits >> i) & 1;
      const r = Math.floor(i / 3);
      const c = size - 11 + (i % 3);
      grid[r][c] = bit; reserved[r][c] = 1;
      grid[c][r] = bit; reserved[c][r] = 1;
    }
  }

  // Place data bits in zig-zag
  const bitStream = [];
  for (const byte of interleaved) {
    for (let b = 7; b >= 0; b--) bitStream.push((byte >> b) & 1);
  }
  let bitIdx = 0;
  let up = true;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;
    for (let step = 0; step < size; step++) {
      const row = up ? size - 1 - step : step;
      for (const cOffset of [0, -1]) {
        const c = col + cOffset;
        if (!reserved[row][c]) {
          grid[row][c] = bitIdx < bitStream.length ? bitStream[bitIdx++] : 0;
        }
      }
    }
    up = !up;
  }

  // Evaluate mask patterns 0..7 and select best
  const maskFns = [
    (r, c) => (r + c) % 2 === 0,
    (r) => r % 2 === 0,
    (_, c) => c % 3 === 0,
    (r, c) => (r + c) % 3 === 0,
    (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
    (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
    (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
    (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
  ];

  let bestMask = 0;
  let bestScore = Infinity;
  let bestGrid = null;

  for (let m = 0; m < 8; m++) {
    const cand = grid.map((row) => new Int8Array(row));
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!reserved[r][c] && maskFns[m](r, c)) cand[r][c] ^= 1;
      }
    }
    // Level M = 00 -> 5-bit format = (0b00 << 3) | m
    const fmt = getBCHFormat((0b00 << 3) | m);
    const coordsA = [
      [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [7, 8], [8, 8],
      [8, 7], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
    ];
    const coordsB = [
      [8, size - 1], [8, size - 2], [8, size - 3], [8, size - 4],
      [8, size - 5], [8, size - 6], [8, size - 7], [8, size - 8],
      [size - 7, 8], [size - 6, 8], [size - 5, 8], [size - 4, 8],
      [size - 3, 8], [size - 2, 8], [size - 1, 8],
    ];
    for (let i = 0; i < 15; i++) {
      const bit = (fmt >> i) & 1;
      cand[coordsA[i][0]][coordsA[i][1]] = bit;
      cand[coordsB[i][0]][coordsB[i][1]] = bit;
    }

    // Simple penalty score (balance + runs)
    let darkCount = 0;
    let penalty = 0;
    for (let r = 0; r < size; r++) {
      let runLen = 1;
      for (let c = 0; c < size; c++) {
        if (cand[r][c] === 1) darkCount++;
        if (c > 0 && cand[r][c] === cand[r][c - 1]) {
          runLen++;
          if (runLen === 5) penalty += 3;
          else if (runLen > 5) penalty += 1;
        } else {
          runLen = 1;
        }
      }
    }
    const pct = Math.abs((darkCount * 100) / (size * size) - 50);
    penalty += Math.floor(pct / 5) * 10;

    if (penalty < bestScore) {
      bestScore = penalty;
      bestMask = m;
      bestGrid = cand;
    }
  }

  return bestGrid;
}

export function qrMatrixToSvgString(matrix, { fg = "#0f172a", bg = "#ffffff", sizePx = 280 } = {}) {
  const n = matrix.length;
  const pad = 3;
  const viewSize = n + pad * 2;
  let paths = "";
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === 1) {
        paths += `M${c + pad},${r + pad}h1v1h-1z`;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewSize} ${viewSize}" width="${sizePx}" height="${sizePx}" shape-rendering="crispEdges"><rect width="${viewSize}" height="${viewSize}" fill="${bg}"/><path d="${paths}" fill="${fg}"/></svg>`;
}
