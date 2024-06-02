import { Suspense, useEffect } from "react"

import "./App.scss"
import "./generics.scss"
import Content from "./components/molecules/Content"
import Header from "./components/molecules/Header"
import useAuth from "./hooks/useAuth"

function App() {
  const auth = useAuth()

  useEffect(() => {
    auth.checkIfAuthed()
  }, [])

  return (
    <Suspense fallback="loading">
      <Header />
      <Content />
    </Suspense>
  )
}

export default App
