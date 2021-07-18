import { useMemo, useEffect } from "react"
import {
    ThemeProvider,
    createTheme,
    PaletteMode,
    useMediaQuery,
} from "@material-ui/core"
import { useStore } from "nanostores/react"
import { scrollbarStyles } from "@/components/scrollbar"
import { palette, changePaletteMode } from "modules/nanostore/palette"

export const drawerWidth: number = 240

export const CustomThemeProvider: React.FC = ({ children }) => {
    const { mode } = useStore(palette)
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

    useEffect(() => {
        if (process.browser) {
            changePaletteMode(prefersDarkMode ? "dark" : "light")
        }
    }, [mode, prefersDarkMode])

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
                mode: mode as PaletteMode,
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
                            scrollbarColors[mode as PaletteMode],
                        ),
                    },
                },
            },
        })

        return nextTheme
    }, [mode, scrollbarColors])

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
