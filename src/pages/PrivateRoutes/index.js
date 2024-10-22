import { Navigate, Outlet } from "react-router-dom"
import MainLayout from "src/components/Layouts"
import STORAGE, { getStorage } from "src/lib/storage"
import ROUTER from "src/router"

function PrivateRoutes() {
  const isLogin = getStorage(STORAGE.TOKEN)

  return !!isLogin ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to={ROUTER.HOME} />
  )
}

export default PrivateRoutes
