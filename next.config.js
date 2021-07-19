const transpiledModules = [
    "@logux/core",
    "@logux/client",
    "nanostores",
    "nanoevents",
    "nanodelay",
]

const withPlugins = require("next-compose-plugins")
const withTM = require("next-transpile-modules")(transpiledModules)

module.exports = withPlugins([withTM], {
    reactStrictMode: true,
    env: {
        BASE_API_URL: process.env.BASE_API_URL,
        LOGUX_API_URL: process.env.LOGUX_API_URL,
        DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
        DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    },
})
