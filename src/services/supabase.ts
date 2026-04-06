import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vdfqlyqlxlwdslqfrmec.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkZnFseXFseGx3ZHNscWZybWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NzI5NzIsImV4cCI6MjA5MTA0ODk3Mn0.oukYOKMsNcqm9422VzcLEGcgA5mq7DUBxaQo1X123Hs';

export const supabase = createClient(supabaseUrl, supabaseKey);
