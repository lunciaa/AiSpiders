import { Link } from "react-router-dom"
import style from "./Logo.module.scss"

const Logo = () => {
  return (
    <div className="clickable-text">
      <Link to="/">
        <h1 className={style.logo}>AiSpiders</h1>
      </Link>
    </div>
  )
}

export default Logo
