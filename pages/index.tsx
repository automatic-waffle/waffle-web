import MuiToolbar from "@material-ui/core/Toolbar"
import MuiContainer from "@material-ui/core/Container"
import MuiGrid from "@material-ui/core/Grid"

import { MainBox } from "@/components/box-with-appbar-height"
import { AppBar } from "@/components/app-bar"
import { ArticleCardForArsenalPresets } from "@/components/card-with-appbar-height"
import { useArsenalPresets } from "@/repositories/use-arsenal-presets"
import { repositories } from "@/repositories/index"
import { definitions } from "@/types/supabase"

export default function Home({
    arsenalPresets,
}: {
    arsenalPresets: definitions["arsenal_presets"][]
}) {
    const { data, isError, isLoading } = useArsenalPresets({
        initialData: arsenalPresets,
    })

    return (
        <>
            <AppBar position="sticky" open={false} color="primary">
                <MuiToolbar></MuiToolbar>
            </AppBar>
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
                                objects={data!}
                                isLoading={isLoading}
                            />
                        </MuiGrid>
                    </MuiGrid>
                </MuiContainer>
            </MainBox>
        </>
    )
}

export async function getStaticProps() {
    const arsenalPresets = await repositories.arsenalPresetsRepository.get()

    return { props: { arsenalPresets } }
}
