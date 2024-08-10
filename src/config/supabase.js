import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_DB_URL;
const supabaseKey = process.env.SUPABASE_DB_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
