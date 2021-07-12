import Head from "next/head"
import type { AppProps } from "next/app"
import { RecoilRoot } from "recoil"

import CssBaseline from "@material-ui/core/CssBaseline"
import { CustomThemeProvider } from "@/components/theme-provider"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Waffle</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <RecoilRoot>
                <CustomThemeProvider>
                    <Component {...pageProps} />
                    <CssBaseline />
                </CustomThemeProvider>
            </RecoilRoot>
        </>
    )
}
export default MyApp
