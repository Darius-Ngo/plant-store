import http from "../index"
import {
  apiGetListNotify,
  apiGetNewNotification,
  apiMarkAsRead,
  apiMarkAsSeen,
  apiDeleteNotifyForUser,
  apiGetListByReferenceId,
} from "./urls"
import QueryString from "qs"

const GetListNotify = params => http.get(apiGetListNotify, { params })
const GetNewNotification = () => http.get(apiGetNewNotification)
const MarkAsRead = params => http.patch(apiMarkAsRead + params)
const MarkAsSeen = params => http.patch(apiMarkAsSeen + params)
const DeleteNotifyForUser = params =>
  http.patch(apiDeleteNotifyForUser + params)
const getListByReferenceId = body => {
  const params = QueryString.stringify(body)
  return http.get(`${apiGetListByReferenceId}?${params}`)
}
const NotifyService = {
  GetListNotify,
  GetNewNotification,
  MarkAsRead,
  MarkAsSeen,
  DeleteNotifyForUser,
  getListByReferenceId,
}
export default NotifyService
