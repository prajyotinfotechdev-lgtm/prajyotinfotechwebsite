// src/utils/cloudinary.js

/**
 * Cloudinary Upload Helper
 * Handles direct signed upload to Cloudinary using credentials from environment variables.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dfctzkdbp";
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY || "192166979551486";
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET || "u_2_CMpESa8X9DZn921Y-2m4i2M";

/**
 * Computes SHA-1 hash for a string using Web Crypto API.
 */
async function sha1Hex(str) {
  const enc = new TextEncoder();
  const data = enc.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Upload an image file to Cloudinary with folder and tags.
 * @param {File} file - The image file to upload
 * @param {Object} options - Optional folder, tags, onProgress callback
 * @returns {Promise<Object>} Upload result with secure_url, public_id, width, height, etc.
 */
export async function uploadToCloudinary(file, options = {}) {
  const { folder = "site_visits", tags = "site_visits,training,delivery", onProgress } = options;

  if (!file) {
    throw new Error("No file provided for upload");
  }

  const timestamp = Math.round(Date.now() / 1000);

  // Parameters to sign in alphabetical order
  // Note: folder and timestamp (and tags if included in signature)
  const paramsToSign = [];
  if (folder) paramsToSign.push(`folder=${folder}`);
  if (tags) paramsToSign.push(`tags=${tags}`);
  paramsToSign.push(`timestamp=${timestamp}`);

  const stringToSign = paramsToSign.join("&") + API_SECRET;
  const signature = await sha1Hex(stringToSign);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", API_KEY);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  if (folder) formData.append("folder", folder);
  if (tags) formData.append("tags", tags);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // Using auto/upload to support both images and videos (mp4, mov, webm)
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`);

    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          resolve({
            url: res.secure_url || res.url,
            secure_url: res.secure_url,
            public_id: res.public_id,
            width: res.width,
            height: res.height,
            format: res.format,
            bytes: res.bytes,
            created_at: res.created_at,
          });
        } catch (err) {
          reject(new Error("Failed to parse Cloudinary response"));
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText);
          reject(new Error(errRes.error?.message || `Upload failed with status ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error during Cloudinary upload"));
    };

    xhr.send(formData);
  });
}
