import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ougwbrpjpkbymjagssyq.supabase.co';
const supabaseAnonKey = 'sb_publishable_vfzBeU9uvoGEwSTsbBzZIQ_LUz_UTfO';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabase() {
  console.log("Checking Jobs Table...");
  const { data: jobs, error: jobsError } = await supabase.from('jobs').select('*');
  if (jobsError) console.error("Jobs Error:", jobsError);
  else console.log(`Success! Found ${jobs.length} jobs in the database.`);

  console.log("\nChecking Applications Table...");
  const { data: apps, error: appsError } = await supabase.from('applications').select('*');
  if (appsError) console.error("Apps Error:", appsError);
  else {
    console.log(`Success! Found ${apps.length} applications in the database.`);
    if (apps.length > 0) {
      console.log("Latest Application details:");
      console.log(`- Candidate: ${apps[0].candidate_name}`);
      console.log(`- Applied for: ${apps[0].job_title}`);
      console.log(`- Status: ${apps[0].status}`);
    }
  }
}

checkDatabase();
