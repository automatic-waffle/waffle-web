import axios from "axios"

import ArsenalPresetsRepository from "@/arsenal-presets"

export const axiosInstance = axios.create({ baseURL: process.env.BASE_API_URL })
export const axiosFetcher = (url: string) => {
    return axiosInstance.get(url).then((res) => res.data)
}

export const repositories = {
    arsenalPresetsRepository: new ArsenalPresetsRepository(axiosInstance),
}

export default repositories
