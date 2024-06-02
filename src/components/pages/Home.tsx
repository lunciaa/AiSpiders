import useContentHeader from "@/hooks/useContentHeader"
import { motion } from "framer-motion"
import { useEffect } from "react"

const Home = () => {
  const { setHeader } = useContentHeader()

  useEffect(() => {
    setHeader("Home")
  }, [])

  return (
    <motion.div exit={{ opacity: 0 }}>
      <h1>HOME</h1>
    </motion.div>
  )
}

export default Home
