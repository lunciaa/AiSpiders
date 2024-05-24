import Logo from "@/components/atoms/Logo"
import style from "./Header.module.scss"

const Header = () => {
  return (
    <header className={style.header}>
      <Logo />
      <div style={{ display: "flex", alignItems: "center" }}>Menu</div>
    </header>
  )
}

export default Header
