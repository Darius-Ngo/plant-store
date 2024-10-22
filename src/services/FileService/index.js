import { apiUploadFile, apiUploadListFile } from "./urls"
import http from "../index"

const uploadFile = body => http.post(apiUploadFile, body)
const uploadListFile = body => http.post(apiUploadListFile, body)

const FileService = {
  uploadFile,
  uploadListFile,
}
export default FileService
