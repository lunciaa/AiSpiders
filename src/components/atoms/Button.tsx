import style from "./Button.module.scss"

type ButtonProps = {
  children: string
  disabled?: boolean
}
const Button = ({ children, disabled }: ButtonProps) => {
  return (
    <div className={style.button}>
      <button disabled={disabled}>{children}</button>
    </div>
  )
}

export default Button
