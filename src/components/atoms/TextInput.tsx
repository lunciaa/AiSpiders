import { ChangeEventHandler, useState } from "react"
import classnames from "classnames"
import style from "./TextInput.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

type TextInputProps = {
  type?: "text" | "email" | "password"
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string
  disabled?: boolean
  error?: boolean
  eye?: boolean
  [x: string]: any //eslint-disable-line
}
const TextInput = ({
  type = "text",
  onChange = undefined,
  value,
  disabled,
  error,
  eye = false,
  ...props
}: TextInputProps) => {
  const [isFocues, setIsFocused] = useState<boolean>(false)
  const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false)

  eye = eye && type === "password"

  const handleEyeClick = () => {
    setShouldShowPassword(!shouldShowPassword)
  }

  return (
    <div
      className={classnames(
        style.input_container,
        isFocues && style.focused,
        error && style.error,
        disabled && style.disabled
      )}
    >
      <input
        type={shouldShowPassword ? "text" : type}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={classnames(eye && style.has_eye)}
        {...(typeof value === "undefined" || typeof onChange === "undefined"
          ? {}
          : { value })}
        {...props}
      />
      {eye && (
        <div
          className={classnames(style.eye, "light-text-on-hover")}
          onClick={handleEyeClick}
          onMouseDown={(e) => {
            e.preventDefault()
          }}
        >
          <FontAwesomeIcon icon={shouldShowPassword ? faEyeSlash : faEye} />
        </div>
      )}
    </div>
  )
}

export default TextInput
