import Logo from "@/components/atoms/Logo"
import style from "./Header.module.scss"
import NavigationInitiator from "../organisms/NavigationInitiator"

const Header = () => {
  return (
    <header className={style.header}>
      <Logo />
      <NavigationInitiator />
    </header>
  )
}

export default Header
