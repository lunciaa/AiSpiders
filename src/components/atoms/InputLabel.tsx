import { ReactNode } from "react"
import classnames from "classnames"
import style from "./InputLabel.module.scss"
import { motion, AnimatePresence } from "framer-motion"

const InputLabel = ({
  children,
  label,
  disabled,
}: {
  children: ReactNode
  label: string
  disabled?: boolean
}) => {
  return (
    <motion.div
      layout
      className={classnames(style.input_label, disabled && style.disabled)}
    >
      <label>
        <AnimatePresence>
          {!disabled && (
            <motion.div
              layout
              className={style.text}
              animate={{ height: "1.5rem" }}
              exit={{ height: 0, opacity: 0, marginBottom: -10 }}
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout>{children}</motion.div>
      </label>
    </motion.div>
  )
}

export default InputLabel
