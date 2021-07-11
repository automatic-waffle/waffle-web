import type { AppProps } from "next/app"
import { CustomThemeProvider } from "../modules/components/theme_provider"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CustomThemeProvider>
            <Component {...pageProps} />
        </CustomThemeProvider>
    )
}
export default MyApp
