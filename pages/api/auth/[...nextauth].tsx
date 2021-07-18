import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
    providers: [
        Providers.Discord({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        session: async (session, user) => {
            ;(session.user as any) = { ...session.user, id: user.id }
            return Promise.resolve(session)
        },
    },
})
