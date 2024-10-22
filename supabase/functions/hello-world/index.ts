// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.0";

const supabaseUrl = 'https://rervreaebeokxztwdtmv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlcnZyZWFlYmVva3h6dHdkdG12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0Mzc5MTgsImV4cCI6MjA0NTAxMzkxOH0.StHE9XXzMkhs8YgfK2gBL49GfTnVjkwAlsaffNK1vA8' // Use your service role key
const supabase = createClient(supabaseUrl, supabaseKey);

Deno.serve(async (req) => {
  
  const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
 

  const { data, error } = await supabase
    .from('people')
    .select('*')
    .eq('parent_id', id);

    const headers = new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Allow all origins; you can restrict this to specific origins
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Specify allowed methods
      "Access-Control-Allow-Headers": "Content-Type, Authorization" // Specify allowed headers
    });


  return new Response(
    JSON.stringify(data),
    { headers},
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/hello-world' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
