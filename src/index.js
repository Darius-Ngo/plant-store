import React from "react"
import { ConfigProvider } from "antd"
import vnVN from "antd/lib/locale/vi_VN"
import "moment/locale/vi"
import "dayjs/locale/vi"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import "swiper/css"
import "src/assets/scss/index.scss"
import "./index.scss"
import StoreProvider from "src/lib/store"
import store from "src/redux/store"
import { ThemeProvider } from "styled-components"
import App from "./App"
import ErrorBoundary from "./components/Boundary"
import { initFacebookSdk } from "./lib/init-fb-sdk"
import { theme } from "./theme"
const root = ReactDOM.createRoot(document.getElementById("root"))

const startApp = () => {
  root.render(
    <BrowserRouter>
      <ThemeProvider
        theme={{
          ...theme,
        }}
      >
        <ConfigProvider locale={vnVN}>
          <Provider store={store}>
            <StoreProvider>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </StoreProvider>
          </Provider>
        </ConfigProvider>
      </ThemeProvider>
    </BrowserRouter>,
    // </React.StrictMode>,
    document.getElementById("root"),
  )
}

initFacebookSdk().then(startApp)
