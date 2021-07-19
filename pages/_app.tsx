import Head from "next/head"
import { useEffect, useState } from "react"
import type { AppProps } from "next/app"
import { Provider } from "next-auth/client"
import { Log, LogStore } from "@logux/core"
import { ClientContext, ChannelErrors } from "@logux/client/react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { badge, badgeEn, ClientMeta, CrossTabClient, log } from "@logux/client"
import { badgeStyles } from "@logux/client/badge/styles"
import { useTranslation } from "react-i18next"

import { CustomThemeProvider } from "@/theme-provider"
import Page403 from "./403"
import Page404 from "./404"
import "@/translations/i18n"

function MyApp({ Component, pageProps }: AppProps) {
    const { t } = useTranslation()
    const [client, setClient] = useState<CrossTabClient<
        {},
        Log<ClientMeta, LogStore>
    > | null>(null)

    useEffect(() => {
        if (process.browser) {
            const client = new CrossTabClient({
                subprotocol: "1.0.0",
                server: process.env.LOGUX_API_URL!,
                userId: pageProps.session?.user?.name! || "anonymous",
                token: (pageProps.session?.accessToken as string) || "",
            })

            badge(client, { messages: badgeEn, styles: badgeStyles })
            log(client)

            setClient(client as CrossTabClient)
        }
    }, [pageProps, setClient])

    return (
        <>
            <Head>
                <title>{t("title")}</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CustomThemeProvider>
                <Provider session={pageProps.session}>
                    <ClientContext.Provider value={client!}>
                        <ChannelErrors
                            NotFound={Page404}
                            AccessDenied={Page403}
                        >
                            <Component {...pageProps} />
                            <CssBaseline />
                        </ChannelErrors>
                    </ClientContext.Provider>
                </Provider>
            </CustomThemeProvider>
        </>
    )
}
export default MyApp
