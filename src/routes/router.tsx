import App from "@/App"
import Home from "@/components/pages/Home"
import WithAuth from "@/utils/WithAuth"
// import Login from "@/components/pages/Login"
import { lazy } from "react"
import { createBrowserRouter } from "react-router-dom"

const Login = lazy(() => {
  // eslint-disable-next-line
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(import("@/components/pages/Login"))
    }, 100)
  })

  // return import("@/components/pages/Login")
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>error</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sign-in",
        element: (
          <WithAuth withoutAuth>
            <Login />
          </WithAuth>
        ),
      },
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
])

export default router
