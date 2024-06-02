import { AuthProvider } from "@/hooks/useAuth"
import RouterProvider from "./RouterProvider"
import { ContentHeaderProvider } from "@/hooks/useContentHeader"

const AppProvider = () => {
  return (
    <ContentHeaderProvider>
      <AuthProvider>
        <RouterProvider />
      </AuthProvider>
    </ContentHeaderProvider>
  )
}

export default AppProvider
