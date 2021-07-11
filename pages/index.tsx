import { useState } from "react"
import Head from "next/head"

import MuiToolbar from "@material-ui/core/Toolbar"
import MuiBox from "@material-ui/core/Box"
import MuiContainer from "@material-ui/core/Container"
import MuiGrid from "@material-ui/core/Grid"
import MuiPaper from "@material-ui/core/Paper"

import { AppBar } from "../modules/components/app_bar"

export default function Home() {
    const [open, setOpen] = useState(false)
    const toggleDrawer = () => {
        setOpen(!open)
    }

    const renderCollection = () =>
        [1, 2, 3].map((k) => (
            <MuiGrid key={k} item xs={12} sm={6} md={4} lg={3}>
                <MuiPaper
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 360,
                    }}
                >
                    Ass
                </MuiPaper>
            </MuiGrid>
        ))

    return (
        <>
            <Head>
                <title>Waffle</title>
            </Head>
            <AppBar position="sticky" open={open}>
                <MuiToolbar
                    sx={{
                        pr: "24px",
                    }}
                ></MuiToolbar>
            </AppBar>
            <MuiBox
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "calc(100vh - 64px)",
                    overflow: "auto",
                }}
            >
                <MuiContainer maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <MuiGrid
                        container
                        spacing={3}
                        alignItems="center"
                        justifyContent="center"
                    >
                        {renderCollection()}
                    </MuiGrid>
                </MuiContainer>
            </MuiBox>
        </>
    )
}
