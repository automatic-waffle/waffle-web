import { useSession } from "next-auth/client"
import { useTranslation } from "react-i18next"

import { styled } from "@material-ui/core/styles"
import MuiAppBar, {
    AppBarProps as MuiAppBarProps,
} from "@material-ui/core/AppBar"
import MuiToolbar from "@material-ui/core/Toolbar"
import MuiButton from "@material-ui/core/Button"
import MuiTypography from "@material-ui/core/Typography"

import { drawerWidth } from "@/theme-provider"

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: theme.shadows[2],
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

export const AppBarWithSession: React.FC = () => {
    const { t } = useTranslation()
    const [session, loading] = useSession()

    return (
        <AppBar position="sticky" open={false} color="secondary">
            <MuiToolbar>
                <MuiTypography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    {t("title")}
                </MuiTypography>
                <MuiButton color="inherit">{t("signin.discord")}</MuiButton>
            </MuiToolbar>
        </AppBar>
    )
}
