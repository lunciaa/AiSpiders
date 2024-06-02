import useAuth from "@/hooks/useAuth"
import { ReactNode, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const WithAuth = ({
  children,
  withoutAuth,
}: {
  children: ReactNode
  withoutAuth: boolean
}) => {
  const [isAuthed, setIsAuthed] = useState<boolean>(false)

  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!auth.id || !(await auth.checkIfAuthed())) {
        if (!withoutAuth) navigate("/")
        else if (mounted) setIsAuthed(false)
      } else {
        if (!withoutAuth) {
          if (mounted) setIsAuthed(true)
        } else navigate("/")
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  if (isAuthed || withoutAuth) return children
  else return <div>Loading...</div>
}

export default WithAuth
