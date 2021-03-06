import NextLink from "next/link"
import { useTranslation } from "react-i18next"

import { styled } from "@material-ui/core/styles"
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

import { definitions } from "@/supabase"
import { useArsenalPresets } from "@/use-arsenal-presets"
import { overrideExistingStyle } from "@/override-existing-style"

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

export const ArticleCardWithContentList: React.FC<{
    title: string
    isLoading: boolean
}> = ({ title, children, isLoading }) => (
    <ArticleCardWithHeader title={title}>
        {isLoading ? (
            <MuiSkeleton
                sx={{ height: 200 }}
                animation="wave"
                variant="rectangular"
            />
        ) : (
            <MuiCardContent>
                <MuiList>{children}</MuiList>
            </MuiCardContent>
        )}
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
    initialData: ObjectType[]
}

export function ArticleCardForArsenalPresets<
    ObjectType extends definitions["arsenal_presets"],
>({ initialData }: Props<ObjectType>) {
    const { t } = useTranslation()
    const { data, isError, isLoading } = useArsenalPresets({
        initialData,
    })

    return (
        <ArticleCardWithContentList
            title={t("presets.arsenal")}
            isLoading={isLoading}
        >
            {data!.map((object) => (
                <ListItemLink
                    key={object.name}
                    title={object.name}
                    subTitle={new Date(object.date_created!).toLocaleString()}
                    href={`/presets/arsenal/${object.name}`}
                />
            ))}
        </ArticleCardWithContentList>
    )
}
