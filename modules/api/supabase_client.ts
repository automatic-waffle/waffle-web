import { createClient } from "@supabase/supabase-js"

import { env } from "./env_config"

export const supabaseWithKeys = createClient(
    env.supabaseApiUrl,
    env.supabaseApiKey,
)
