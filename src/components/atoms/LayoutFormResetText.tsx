import { motion, AnimatePresence } from "framer-motion"

type form_reset_text_props = {
  show: boolean
  handleReset: () => void
  children: string
}

const LayoutFormResetText = ({
  show,
  handleReset,
  children,
}: form_reset_text_props) => (
  <AnimatePresence>
    {show && (
      <motion.div
        layout
        className="clickable-text"
        style={{
          fontSize: ".8rem",
          width: "fit-content",
          margin: "3px auto 0",
        }}
        onClick={handleReset}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
)

export default LayoutFormResetText
