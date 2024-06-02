import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"
import "./localisation/i18n"
import AppProvider from "./providers/AppProvider"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>
)
