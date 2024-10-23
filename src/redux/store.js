import { configureStore } from "@reduxjs/toolkit"
import appGlobalReducer from "./appGlobal"
import loginModalReducer from "./loginModal"

export default configureStore({
  reducer: {
    appGlobal: appGlobalReducer,
    loginModal: loginModalReducer,
  },
})
