import i18n from "i18next"
import I18NextHttpBackend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"
import getLang from "@/utils/getLang"

const currentHost =
  import.meta.env.MODE === "development"
    ? "http://localhost:5173"
    : "production_domain"

i18n
  .use(I18NextHttpBackend)
  .use(initReactI18next)
  .init({
    lng: getLang(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${currentHost}/i18n/{{lng}}.json`,
    },
  })

export default i18n
