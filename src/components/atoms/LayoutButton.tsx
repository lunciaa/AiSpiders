import { motion } from "framer-motion"
import Button from "./Button"

const LayoutButton = ({
  children,
  disabled,
}: {
  children: string
  disabled: boolean
}) => {
  return (
    <motion.div layout>
      <Button disabled={disabled}>{children}</Button>
    </motion.div>
  )
}

export default LayoutButton
