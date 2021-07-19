import { Box as MuiBox } from "@material-ui/core"
import { styled } from "@material-ui/core/styles"

import { overrideExistingStyle } from "@/utils/overrideExistingStyle"

export const BoxWithAppbarHeight = styled(MuiBox)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.grey[50]
            : theme.palette.background.default,
    flexGrow: 1,
    overflow: "auto",
    ...overrideExistingStyle(
        theme.mixins.toolbar,
        ["", "minHeight"],
        // Full height - toolbar height - padding top - padding bottom
        (value: unknown) => `calc(100vh - 64px)`,
    ),
}))

export const MainBox = BoxWithAppbarHeight.withComponent("main")
