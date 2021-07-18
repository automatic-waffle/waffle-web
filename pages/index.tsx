import { GetServerSideProps } from "next"
import { getSession, GetSessionOptions } from "next-auth/client"

import MuiContainer from "@material-ui/core/Container"
import MuiGrid from "@material-ui/core/Grid"

import { MainBox } from "@/components/box-with-appbar-height"
import { AppBarWithSession } from "@/components/app-bar"
import { ArticleCardForArsenalPresets } from "@/components/card-with-appbar-height"
import { repositories } from "@/repositories/index"
import { definitions } from "@/types/supabase"

export default function Home({
    arsenalPresets,
}: {
    arsenalPresets: definitions["arsenal_presets"][]
}) {
    return (
        <>
            <AppBarWithSession />
            <MainBox>
                <MuiContainer maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <MuiGrid
                        container
                        spacing={3}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <MuiGrid item xs>
                            <ArticleCardForArsenalPresets
                                initialData={arsenalPresets}
                            />
                        </MuiGrid>
                    </MuiGrid>
                </MuiContainer>
            </MainBox>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context as GetSessionOptions)
    const arsenalPresets = await repositories.arsenalPresetsRepository.get()

    return {
        props: { session, arsenalPresets },
    }
}
