import axios from "axios"
import http from "../index"
import {
  apiGetTotalStatus,
  apiGetListOrderUser,
  apiGetListOrderManager,
  apiAddOrder,
  apiGetDetailOrder,
  apiUpdateStatus,
  apiGetDetailUpdate,
  apiGetListAddressOrder,
  apiAddAddress,
  apiUpdateAddress,
  apiDeleteAddress,
} from "./urls"

const getTotalStatus = params => http.get(apiGetTotalStatus, { params })
const getListOrderUser = params => http.get(apiGetListOrderUser, { params })
const getListOrderManager = params =>
  http.get(apiGetListOrderManager, { params })
const getDetailOrder = params => http.get(apiGetDetailOrder, { params })
const addOrder = body => http.post(apiAddOrder, body)
const updateStatus = body => http.post(apiUpdateStatus, body)
const getDetailUpdate = params => http.get(apiGetDetailUpdate, { params })

const getListAddressOrder = params =>
  http.get(apiGetListAddressOrder, { params })
const addAddress = body => http.post(apiAddAddress, body)
const updateAddress = body => http.post(apiUpdateAddress, body)
const deleteAddress = body => http.patch(apiDeleteAddress, body)

const getQR = body => {
  return axios({
    method: "post",
    url: `https://api.vietqr.io/v2/generate`,
    data: body,
    headers: {
      "x-client-id": process.env.REACT_APP_CLIENT_ID,
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
  })
}

const OrderService = {
  getTotalStatus,
  getListOrderUser,
  getListOrderManager,
  getDetailOrder,
  addOrder,
  updateStatus,
  getDetailUpdate,
  getListAddressOrder,
  addAddress,
  updateAddress,
  deleteAddress,
  getQR,
}
export default OrderService
