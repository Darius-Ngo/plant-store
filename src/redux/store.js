import { configureStore } from "@reduxjs/toolkit"
import appGlobalReducer from "./appGlobal"
import loginModalReducer from "./loginModal"
import postReducer from "./post"

export default configureStore({
  reducer: {
    appGlobal: appGlobalReducer,
    loginModal: loginModalReducer,
    post: postReducer,
  },
})
