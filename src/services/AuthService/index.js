import http from "../index"
import {
  apiLogin,
  apiRegister,
  apiChangePassword,
  apiForgotPassword,
  apiGetUserInfo,
  apiUpdateUserInfo,
} from "./urls"

const login = body => http.post(apiLogin, body)
const register = body => http.post(apiRegister, body)
const changePassword = body => http.post(apiChangePassword, body)
const forgotPassword = body => http.post(apiForgotPassword, body)
const updateUserInfo = body => http.put(apiUpdateUserInfo, body)
const getUserInfo = params => http.get(apiGetUserInfo)

const AuthService = {
  login,
  register,
  changePassword,
  forgotPassword,
  updateUserInfo,
  getUserInfo,
}
export default AuthService
