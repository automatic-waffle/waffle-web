import type { AppProps } from "next/app"
import { CustomThemeProvider } from "../src/theme"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CustomThemeProvider>
            <Component {...pageProps} />
        </CustomThemeProvider>
    )
}
export default MyApp
