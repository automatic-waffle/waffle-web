import { PostgrestError } from "@supabase/supabase-js"
import { supabaseWithKeys } from "./supabase_client"

export interface ArsenalPreset {
    name: string
    items?: string[]
    date_created?: string
}

export async function getArsenalPresets(): Promise<
    [ArsenalPreset[], PostgrestError | null]
> {
    let { data: items, error } = await supabaseWithKeys
        .from("arsenal_presets")
        .select("items")
    if (error && !items) {
        return [[], error]
    }

    return [items!, null]
}
