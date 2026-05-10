import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hreulbsrxakoxwshzmgj.supabase.co'
const supabaseKey = 'sb_publishable_JLR3hX6nJVIcmYrFMzJCOw__ra24kRL'

export const supabase = createClient(supabaseUrl, supabaseKey)