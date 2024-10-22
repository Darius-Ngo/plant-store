import http from "../index"
import {
  apiGetListComment,
  apiAddComment,
  apiUpdateComment,
  apiDeleteComment,
} from "./urls"

const getListComment = body => http.post(apiGetListComment, body)
const addComment = body => http.post(apiAddComment, body)
const updateComment = body => http.put(apiUpdateComment, body)
const deleteComment = params => http.delete(apiDeleteComment, { params })

const CommentService = {
  getListComment,
  addComment,
  updateComment,
  deleteComment,
}
export default CommentService
