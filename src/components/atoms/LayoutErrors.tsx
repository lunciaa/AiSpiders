import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "react-i18next"

type layout_errors_props = {
  errors: string[]
}

const LayoutErrors = ({ errors }: layout_errors_props) => {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {errors.map((msg: string) => (
        <motion.div
          layout
          initial={{ y: -20, opacity: 0, height: 0, marginTop: 0 }}
          animate={{ y: 0, opacity: 1, height: "fit-content", marginTop: -5 }}
          exit={{ y: -20, opacity: 0, height: 0, marginTop: 0 }}
          key={msg}
          className={"error"}
        >
          {t(msg as string)}
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

export default LayoutErrors
