import { createContext, ReactNode, useContext, useState } from "react"
import * as api from "@/services/api"
import { get_account } from "@/types/responses"
import { dummyPromiseFunction } from "@/utils/others"

import { Location, NavigateFunction } from "react-router-dom"

const EMPTY_AUTH_STATE = {
  id: null,
  displayName: null,
  profilePicture: null,
}

type auth_state = {
  id: string | null
  displayName: string | null
  profilePicture: string | null
}

type login_function = (
  routing?: { navigate: NavigateFunction; location: Location<any> } //eslint-disable-line
) => void

type auth_context = auth_state & {
  checkIfAuthed: () => Promise<boolean>
  logout: () => void
  login: login_function
}

const AuthContext = createContext<auth_context>({
  ...EMPTY_AUTH_STATE,
  checkIfAuthed: dummyPromiseFunction,
  logout: () => {},
  login: () => {},
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<auth_state>(EMPTY_AUTH_STATE)

  const logout = () => {
    setAuth(EMPTY_AUTH_STATE)
    api.parseResponse(api.del("account/logout"))
  }

  const login: login_function = (
    routing // eslint-disable-line
  ) => {
    checkIfAuthed()
    if (routing?.location && location.pathname === "/sign-in")
      routing.navigate("/")
  }

  const checkIfAuthed = async () => {
    try {
      const response = await api.get("account")

      const json = (await response.json()) as get_account
      if (!json.id) {
        logout()
        return false
      }

      setAuth(json)

      return true
    } catch (err) {
      api.handleError(err, {
        401: () => {},
      })
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ ...auth, checkIfAuthed, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}

export { AuthProvider }
export default useAuth
