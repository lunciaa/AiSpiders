import { navigation_entry_props } from "@/types/props"
import style from "./Navigation.module.scss"
import NavigationEntry from "@/components/molecules/NavigationEntry"
import { motion } from "framer-motion"

const Navigation = ({
  locations,
  id,
}: {
  locations: navigation_entry_props[]
  id: string
}) => {
  return (
    <motion.ul
      initial={{ opacity: 0, scale: 0, translateY: "50%" }}
      animate={{ opacity: 1, scale: 1, translateY: "100%" }}
      exit={{ opacity: 0, scale: 0, translateY: "50%" }}
      className={style.sub}
      id={id}
    >
      {locations.map((props) => (
        <NavigationEntry {...props} key={props.id} />
      ))}
    </motion.ul>
  )
}

export default Navigation
