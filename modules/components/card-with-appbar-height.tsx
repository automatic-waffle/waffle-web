import { styled } from "@material-ui/core/styles"
import { overrideExistingStyle } from "@/utils/overrideExistingStyle"

import NextLink from "next/link"
import MuiCard from "@material-ui/core/Card"
import MuiCardHeader from "@material-ui/core/CardHeader"
import MuiCardContent from "@material-ui/core/CardContent"
import MuiList from "@material-ui/core/List"
import MuiListItem from "@material-ui/core/ListItem"
import MuiListItemText from "@material-ui/core/ListItemText"
import MuiLink from "@material-ui/core/Link"
import EditIcon from "@material-ui/icons/Edit"
import MuiSkeleton from "@material-ui/core/Skeleton"
import MuiBox from "@material-ui/core/Box"

import { definitions } from "@/types/supabase"
import { PropsWithChildren } from "react"
import { Typography } from "@material-ui/core"

export const CardWithAppbarHeight = styled(MuiCard)(({ theme }) => ({
    ...overrideExistingStyle(
        theme.mixins.toolbar,
        ["minHeight", "maxHeight"],
        // Full height - toolbar height - padding top - padding bottom
        (value: unknown) =>
            `calc(100vh - ${value}px - ${theme.spacing(4)} * 2)`,
    ),
}))

export const ArticleCard = CardWithAppbarHeight

export const ArticleCardWithHeader: React.FC<{ title: string }> = ({
    title,
    children,
}) => (
    <ArticleCard>
        <MuiCardHeader
            title={title}
            titleTypographyProps={{
                align: "center",
                variant: "h5",
                sx: { fontWeight: "bold" },
            }}
        />
        {children}
    </ArticleCard>
)

export const ArticleCardWithContentList: React.FC<{ title: string }> = ({
    title,
    children,
}) => (
    <ArticleCardWithHeader title={title}>
        <MuiCardContent>
            <MuiList>{children}</MuiList>
        </MuiCardContent>
    </ArticleCardWithHeader>
)

export const ListItemLink: React.FC<{
    title: string
    subTitle: string
    href: string
}> = ({ title, subTitle, href }) => (
    <MuiListItem
        secondaryAction={
            <NextLink href={href} passHref>
                <MuiLink>
                    <MuiBox
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            typography: {
                                fontSize: "1.2rem",
                                fontWeight: "light",
                            },
                        }}
                    >
                        Edit
                        <EditIcon fontSize="inherit" />
                    </MuiBox>
                </MuiLink>
            </NextLink>
        }
    >
        <MuiListItemText primary={title} secondary={subTitle} />
    </MuiListItem>
)

interface Props<ObjectType> {
    objects: ObjectType[]
    properties?: {
        key: keyof ObjectType
    }[]
    isLoading: boolean
}

export function ArticleCardForArsenalPresets<
    ObjectType extends definitions["arsenal_presets"],
>({ objects, isLoading }: PropsWithChildren<Props<ObjectType>>) {
    return (
        <ArticleCardWithContentList title="Arsenal Presets">
            {isLoading ? (
                <MuiSkeleton
                    sx={{ height: 200 }}
                    animation="wave"
                    variant="rectangular"
                />
            ) : (
                objects.map((object) => (
                    <ListItemLink
                        key={object.name}
                        title={object.name}
                        subTitle={new Date(
                            object.date_created!,
                        ).toLocaleString()}
                        href={`/presets/arsenal/${object.name}`}
                    ></ListItemLink>
                ))
            )}
        </ArticleCardWithContentList>
    )
}
