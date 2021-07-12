import { styled } from "@material-ui/core/styles"
import MuiAppBar, {
    AppBarProps as MuiAppBarProps,
} from "@material-ui/core/AppBar"

import { drawerWidth } from "@/components/theme-provider"

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
