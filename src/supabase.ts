import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aatfcocofqlrvvkompbs.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error("Supabase key is not provided");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
