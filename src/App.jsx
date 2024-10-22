import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import STORAGE, { getStorage } from "src/lib/storage"
import SpinCustom from "./components/Spin"
import { setListCart, setListTabs, setUserInfo } from "./redux/appGlobal"
import AppRouter from "./router/AppRouter"
import CartService from "./services/CartService"
import "./App.scss"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)
function App() {
  const isLogin = getStorage(STORAGE.TOKEN)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const getListCart = async user_id => {
    try {
      setLoading(true)
      const res = await CartService.getListCart(user_id)
      dispatch(setListCart(res.data || []))
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!!isLogin) {
      const user = getStorage(STORAGE.USER_INFO)
      dispatch(setUserInfo(user))
      dispatch(setListTabs(user?.danh_sach_quyen))
      getListCart(user.id)
    }
  }, [isLogin])

  return (
    <div className="layout-center">
      <div className="layout-max-width">
        {loading ? (
          <div className="loading-center" style={{ height: "100vh" }}>
            <SpinCustom />
          </div>
        ) : (
          <AppRouter />
        )}
      </div>
    </div>
  )
}

export default App
