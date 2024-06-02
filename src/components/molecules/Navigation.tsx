import { navigation_entry_props } from "@/types/props"
import style from "./Navigation.module.scss"
import NavigationEntry from "@/components/molecules/NavigationEntry"
const Navigation = ({ locations }: { locations: navigation_entry_props[] }) => {
  return (
    <nav className={style.navigation}>
      <ul>
        {locations.map((props) => (
          <NavigationEntry {...props} key={props.id} />
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
