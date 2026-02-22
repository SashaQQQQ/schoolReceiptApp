import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://doazbmmsotthekjgvnla.supabase.co";
const supabaseKey = "sb_publishable_hnidzVHQpi23gaM1tJVYFA_jcsQ0RzL";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
