import {
  apiGetListRequest,
  apiAddRequest,
  apiUpdateRequest,
  apiUpdateStatus,
  apiDeleteRequest,
} from "./urls"
import http from "../index"

const getListRequest = body => http.post(apiGetListRequest, body)
const addRequest = body => http.post(apiAddRequest, body)
const updateRequest = body => http.post(apiUpdateRequest, body)
const updateStatus = body => http.post(apiUpdateStatus, body)
const deleteRequest = params => http.delete(apiDeleteRequest, { params })

const RequestSupportService = {
  getListRequest,
  addRequest,
  updateStatus,
  updateRequest,
  deleteRequest,
}
export default RequestSupportService
