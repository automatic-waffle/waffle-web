import { useMemo, useEffect } from "react"
import {
    ThemeProvider,
    createTheme,
    PaletteMode,
    useMediaQuery,
} from "@material-ui/core"
import { useRecoilState } from "recoil"

import { scrollbarStyles } from "@/components/scrollbar"
import paletteModeState from "@/atoms/paletteModeState"

export const drawerWidth: number = 240

export const CustomThemeProvider: React.FC = ({ children }) => {
    const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState)
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

    useEffect(() => {
        if (process.browser) {
            setPaletteMode(prefersDarkMode ? "dark" : "light")
        }
    }, [prefersDarkMode, setPaletteMode])

    const scrollbarColors = useMemo(() => {
        const nextScrollbarColors = {
            dark: {
                track: "#2b2b2b",
                thumb: "#6b6b6b",
                active: "#959595",
            },
            light: {
                track: "#ffffff",
                thumb: "#6b6b6b",
                active: "#959595",
            },
        }

        return nextScrollbarColors
    }, [])

    const theme = useMemo(() => {
        const nextTheme = createTheme({
            palette: {
                mode: paletteMode as PaletteMode,
                primary: {
                    main: "#b71c1c",
                },
                secondary: {
                    main: "#80d8ff",
                },
            },
            typography: {
                fontFamily: [
                    "Recursive",
                    "monospace",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                ].join(","),
            },
            components: {
                MuiCssBaseline: {
                    styleOverrides: {
                        body: scrollbarStyles(
                            scrollbarColors[paletteMode as PaletteMode],
                        ),
                    },
                },
            },
        })

        return nextTheme
    }, [paletteMode, scrollbarColors])

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
