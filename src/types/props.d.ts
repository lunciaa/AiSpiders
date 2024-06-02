import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { ReactNode } from "react"

export type navigation_entry_type = "link" | "auto" | "button"

export type navigation_entry_props = {
  id: string
  label?: ReactNode
  location?: string
  action?: () => void
  type?: navigation_entry_type
  element?: React.ReactElement
  icon?: IconDefinition
  iconPosition?: "start" | "end"
  // icon?: React.ReactElement
  sub?: navigation_entry_props[]
}
