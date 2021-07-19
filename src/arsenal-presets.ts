import { AxiosInstance } from "axios"
import { definitions } from "@/supabase"

export default class ArsenalPresetsRepository {
    constructor(private axiosClient: AxiosInstance) {}

    get() {
        return this.axiosClient
            .get<definitions["arsenal_presets"][]>("/arsenal-presets")
            .then(({ data }) => data)
    }
}
