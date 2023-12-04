import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {uk, en} from "./locale";

i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
        ...uk, ...en,
    },
    lng: "uk",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    }
})

export default i18n;