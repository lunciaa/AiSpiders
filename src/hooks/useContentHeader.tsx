import { useContext, useState, createContext, ReactNode } from "react"

const ContentHeaderContext = createContext<{
  header: string
  setHeader: (val: string) => void
}>({
  header: "",
  setHeader: () => {},
})

const ContentHeaderProvider = ({ children }: { children: ReactNode }) => {
  const [contentHeader, setContentHeader] = useState<string>("Main")

  return (
    <ContentHeaderContext.Provider
      value={{ header: contentHeader, setHeader: setContentHeader }}
    >
      {children}
    </ContentHeaderContext.Provider>
  )
}

const useContentHeader = () => {
  const { header, setHeader } = useContext(ContentHeaderContext)

  return { setHeader, header }
}

export { ContentHeaderProvider }
export default useContentHeader
