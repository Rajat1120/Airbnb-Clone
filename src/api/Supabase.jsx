import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xailnuaqpfvjojptkpgh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhaWxudWFxcGZ2am9qcHRrcGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1MDYwNzQsImV4cCI6MjAzODA4MjA3NH0.ku6paLHg6HCMyGXwmd7XSW8Gp_tjyDrux046qOTxjxg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
