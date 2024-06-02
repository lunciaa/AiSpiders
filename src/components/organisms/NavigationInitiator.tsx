import useAuth from "@/hooks/useAuth"
import { navigation_entry_props } from "@/types/props"
import {
  faHome,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import Navigation from "../molecules/Navigation"

const NavigationInitiator = () => {
  const { t } = useTranslation()

  const auth = useAuth()

  const locations: navigation_entry_props[] = [
    {
      id: "home",
      label: t("nav_home"),
      location: "/",
      type: "link",
      icon: faHome,
    },
  ]

  if (auth.id) {
    // SIGNED IN
    locations.push({
      id: "profile",
      label: t("nav_profile"),
      location: "/profile",
      icon: faUser,
      sub: [
        {
          id: "logout",
          label: t("nav_logout"),
          icon: faRightFromBracket,
          iconPosition: "end",
          action: auth.logout,
          type: "button",
        },
      ],
    })
  } else {
    // NOT SIGNED IN
    locations.push({
      id: "sign_in",
      label: t("nav_sign_in"),
      location: "/sign-in",
      type: "auto",
      icon: faUser,
    })
  }

  return <Navigation locations={locations} />
}

export default NavigationInitiator
