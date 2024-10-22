import http from "../index"
import {
  apiLogin,
  apiLogout,
  apiRegister,
  apiChangePassWord,
  apiForgetPassWord,
  apiConfirmOTP,
  apiLoginFacebook,
} from "./urls"

const login = body => http.post(apiLogin, body)
const register = body => http.post(apiRegister, body)
const changePassWord = body => http.post(apiChangePassWord, body)
const forgetPassWord = body => http.post(apiForgetPassWord, body)
const confirmOTP = body => http.post(apiConfirmOTP, body)
const logout = () => http.post(apiLogout)
const loginFacebook = () => http.get(apiLoginFacebook)

const AuthService = {
  login,
  logout,
  register,
  changePassWord,
  forgetPassWord,
  confirmOTP,
  loginFacebook,
}
export default AuthService
