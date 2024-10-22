const { createClient } = require('@supabase/supabase-js');
require("dotenv").config({ path: './.env' })

const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);


async function generateOrgChart() {
  const people = [];
  let currentId = 1;
  

  people.push({ id: currentId, parent_id: null, name: `Person ${currentId}` });
  const ceoId = currentId;
  currentId++;


  let parentIds = [ceoId];
  for (let level = 1; level <= 5; level++) {
    let newParentIds = [];
    for (const parentId of parentIds) {
      for (let i = 0; i < (level === 1 ? 5 : 10); i++) {
        people.push({ id: currentId, parent_id: parentId, name: `Person ${currentId}` });
        newParentIds.push(currentId);
        currentId++;
        if (currentId > 5556) break;
      }
      if (currentId > 5556) break;
    }
    parentIds = newParentIds;
  }


  const { data, error } = await supabase.from('people').insert(people);
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Data inserted:', data);
  }
}

generateOrgChart();