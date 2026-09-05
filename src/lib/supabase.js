import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || process.env.VITE_SUPABASE_URL || 'https://ougwbrpjpkbymjagssyq.supabase.co';
const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_vfzBeU9uvoGEwSTsbBzZIQ_LUz_UTfO';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
