import style from "./Content.module.scss"
import { Suspense } from "react"
import useContentHeader from "@/hooks/useContentHeader"
import AnimatedOutlet from "./AnimatedOutlet"

const Content = () => {
  const { header } = useContentHeader()

  return (
    <main className={style.content}>
      <h2>{header}</h2>
      <Suspense fallback={<div>Loading</div>}>
        <AnimatedOutlet />
      </Suspense>
    </main>
  )
}

export default Content
