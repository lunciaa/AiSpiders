import { Outlet } from "react-router-dom"
import style from "./Content.module.scss"

const Content = () => {
  return (
    <main className={style.content}>
      <Outlet />
    </main>
  )
}

export default Content
