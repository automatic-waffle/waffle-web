import { useMediaQuery } from "@material-ui/core"
import { ThemeProvider, createTheme } from "@material-ui/core"
import { scrollbarStyles } from "./scrollbar"

export const drawerWidth: number = 240

export const CustomThemeProvider: React.FC = ({ children }) => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    const preferredMode = prefersDarkMode ? "dark" : "light"

    const scrollbarColors = {
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

    const theme = createTheme({
        palette: {
            primary: {
                light: "#e91e63",
                main: "#c2185b",
                dark: "#880e4f",
            },
            secondary: {
                light: "#ffb74d",
                main: "#f9b934",
                dark: "#FF9800",
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: scrollbarStyles(scrollbarColors[preferredMode]),
                },
            },
        },
    })

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
