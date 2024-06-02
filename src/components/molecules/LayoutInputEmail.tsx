import { ChangeEventHandler } from "react"
import InputLabel from "../atoms/InputLabel"
import TextInput from "../atoms/TextInput"
import LayoutErrors from "../atoms/LayoutErrors"

type EmailInputProps = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  disabled: boolean
  errors: string[]
}

const LayoutInputEmail = ({
  value,
  onChange,
  disabled,
  errors,
}: EmailInputProps) => {
  errors = errors.filter((msg) => msg !== "silent")
  return (
    <>
      <InputLabel label="Email" disabled={disabled}>
        <TextInput
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoFocus
        />
      </InputLabel>
      <LayoutErrors errors={errors} />
    </>
  )
}

export default LayoutInputEmail
