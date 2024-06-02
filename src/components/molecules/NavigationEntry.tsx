import useIsMobile from "@/hooks/useIsMobile"

import { navigation_entry_props, navigation_entry_type } from "@/types/props"
import { Link } from "react-router-dom"
import TextButton from "../atoms/TextButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MouseEventHandler, ReactNode, useEffect, useState } from "react"
import {
  faCircleArrowDown,
  faCircleArrowUp,
} from "@fortawesome/free-solid-svg-icons"

import style from "./NavigationEntry.module.scss"
import classNames from "classnames"
import { AnimatePresence } from "framer-motion"
import NavigationAnimated from "./NavigationAnimated"

const TypeWrapper = ({
  type,
  isMobile,
  children,
  onClick,
  location,
}: {
  type: navigation_entry_type
  isMobile: boolean
  children: ReactNode
  location?: string
  onClick: () => void
}) => {
  if (type === "auto" && !isMobile) {
    // this should return popup opener
    return <Link to={location || "/"}>{children}</Link>
  } else if (type === "button") {
    return <TextButton onClick={onClick}>{children}</TextButton>
  } else {
    return <Link to={location || "/"}>{children}</Link>
  }
}

const NavigationEntry = ({
  id,
  label,
  location,
  action,
  // element,
  icon,
  type = "link",
  sub,
  iconPosition = "start",
}: navigation_entry_props) => {
  const isMobile = useIsMobile()

  const [isSubOpened, setIsSubOpened] = useState<boolean>(false)

  useEffect(() => {
    const handleClick = ({ target }: MouseEvent) => {
      if (!isSubOpened || !target) return

      const subContainer = document.getElementById(id)

      if (!subContainer?.contains(target as Node)) setIsSubOpened(false)
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [isSubOpened])

  const handleButtonClick = () => {
    if (typeof action !== "undefined") action()
    else console.log(`Button clicked ${label}`)
  }

  const handleSubOpenButton: MouseEventHandler<HTMLDivElement> = (evt) => {
    evt.stopPropagation()
    setIsSubOpened(!isSubOpened)
  }

  const Icon = icon ? () => <FontAwesomeIcon icon={icon} /> : () => <></>
  const IconAndLabel =
    iconPosition === "start"
      ? () => (
          <>
            <Icon /> <span>{label}</span>
          </>
        )
      : () => (
          <>
            <span>{label}</span> <Icon />
          </>
        )

  return (
    <li className={classNames("clickable-text", style.nav_entry)}>
      <TypeWrapper
        isMobile={isMobile}
        onClick={handleButtonClick}
        type={type}
        location={location}
      >
        <IconAndLabel />
      </TypeWrapper>

      {sub && (
        <div className={style.open_sub} onClick={handleSubOpenButton}>
          <FontAwesomeIcon
            icon={isSubOpened ? faCircleArrowUp : faCircleArrowDown}
          />
        </div>
      )}

      <AnimatePresence>
        {sub && isSubOpened && <NavigationAnimated id={id} locations={sub} />}
      </AnimatePresence>
    </li>
  )
}

export default NavigationEntry
