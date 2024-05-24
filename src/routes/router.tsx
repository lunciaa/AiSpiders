import App from "@/App"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "/test",
        element: <div>Test</div>,
      },
    ],
  },
])

export default router
