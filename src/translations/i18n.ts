import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
    "en-US": {
        translation: {
            title: "Waffle",
            "presets.arsenal": "Arsenal Presets",
            "signin.discord": "Sign In Discord",
        },
    },
}

i18n.use(initReactI18next).init({
    resources,
    lng: "en-US",
    interpolation: {
        escapeValue: false,
    },
})

export default i18n
