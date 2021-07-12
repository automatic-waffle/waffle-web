import useSWR from "swr"

import { axiosFetcher } from "@/repositories/index"
import { definitions } from "@/types/supabase"

export function useArsenalPresets({
    initialData,
}: {
    initialData?: definitions["arsenal_presets"][]
}) {
    const { data, error } = useSWR<definitions["arsenal_presets"][]>(
        `/arsenal-presets`,
        axiosFetcher,
        {
            initialData,
        },
    )

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}
