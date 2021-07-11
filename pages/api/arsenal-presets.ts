import type { NextApiRequest, NextApiResponse } from "next"

import {
    ArsenalPreset,
    getArsenalPresets,
} from "../../modules/api/arsenal_presets"
import { ErrorType } from "../../modules/api/error"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ArsenalPreset[] | ErrorType>,
) {
    const [data, error] = await getArsenalPresets()
    if (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        } as ErrorType)

        return
    }

    res.status(200).json(data)
}
