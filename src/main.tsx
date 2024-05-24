import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"
import RouterProvider from "./providers/RouterProvider.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider />
  </React.StrictMode>
)
