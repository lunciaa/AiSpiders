import { AnimatePresence, motion } from "framer-motion"
import InputLabel from "../atoms/InputLabel"
import TextInput from "../atoms/TextInput"
import { ChangeEventHandler } from "react"
import LayoutErrors from "../atoms/LayoutErrors"

type layout_input_password_props = {
  show: boolean
  errors: string[]
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const LayoutInputPassword = ({
  show,
  errors,
  value,
  onChange,
}: layout_input_password_props) => {
  errors = errors.filter((msg) => msg !== "silent")
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          layout
          initial={{ y: -50, opacity: 0, height: 0 }}
          animate={{ y: 0, opacity: 1, height: "fit-content" }}
          exit={{ y: -50, opacity: 0, height: 0 }}
        >
          <InputLabel label="Password">
            <TextInput
              type="password"
              value={value}
              onChange={onChange}
              error={errors.length > 0}
              autoFocus
              eye
            />
          </InputLabel>
          <LayoutErrors errors={errors} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LayoutInputPassword
