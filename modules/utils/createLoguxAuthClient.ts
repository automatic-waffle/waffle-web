import { CrossTabClient } from "@logux/client"
import { useSession } from "next-auth/client"
import { useEffect, useState } from "react"

export function useCreateLoguxAuthClient() {
    const [session, loading] = useSession()
    const [client, setClient] = useState({})

    useEffect(() => {
        const client = new CrossTabClient({
            subprotocol: "1.0.0",
            server: process.env.LOGUX_API_URL!,
            userId: session?.user?.name!,
            token: session?.accessToken as string,
        })
        !loading && setClient(client)
    }, [session, loading])

    return client as CrossTabClient
}
