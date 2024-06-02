export default () => {
  return (
    localStorage.getItem("lang") ||
    navigator.language.split(",")[0].split("-")[0]
  )
}
