const supabasejs = require('@supabase/supabase-js')

const PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YmNwZ2hzZGZleXNyZXNsc2JrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODg5NzY5MSwiZXhwIjoxOTk0NDczNjkxfQ.fB8N2TPMpo7FPkCz1sYFPQ7FhWU94ydWfPISQEp1b3E"
const PUBLIC_SUPABASE_URL = "https://ewbcpghsdfeysreslsbk.supabase.co/"

const supabase = supabasejs.createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

module.exports = supabase