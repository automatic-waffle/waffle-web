import Head from "next/head"
import type { AppProps } from "next/app"
import { Provider } from "next-auth/client"
import { ClientContext, ChannelErrors } from "@logux/client/react"
import Page404 from "./404"
import Page403 from "./403"
import CssBaseline from "@material-ui/core/CssBaseline"
import { CustomThemeProvider } from "@/components/theme-provider"
import { badge, badgeEn, log } from "@logux/client"
import { badgeStyles } from "@logux/client/badge/styles"
import "@/translations/i18n"
import { useTranslation } from "react-i18next"
import { useCreateLoguxAuthClient } from "@/utils/createLoguxAuthClient"

function MyApp({ Component, pageProps }: AppProps) {
    const { t } = useTranslation()
    const loguxAuthClient = useCreateLoguxAuthClient()

    badge(loguxAuthClient, { messages: badgeEn, styles: badgeStyles })
    log(loguxAuthClient)

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
                    <ClientContext.Provider value={loguxAuthClient}>
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
