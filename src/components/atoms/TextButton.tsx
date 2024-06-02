import style from "./TextButton.module.scss"

type textButtonProps = {
  children: React.ReactNode
  onClick: () => void
}

const TextButton = ({ children, onClick }: textButtonProps) => {
  return (
    <button className={style.button} onClick={onClick}>
      {children}
    </button>
  )
}

export default TextButton
