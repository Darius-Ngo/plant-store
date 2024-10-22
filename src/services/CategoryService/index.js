import http from "../index"
import {
  apiGetListCategory,
  apiGetDetailCategory,
  apiAddCategory,
  apiUpdateCategory,
  apiDeleteCategory,
  apiChangeStatus,
  apiGetListCategoryInHome,
  apiExportExcel,
} from "./urls"

const getListCategory = body => http.post(apiGetListCategory, body)
const exportExcel = body =>
  http.post(apiExportExcel, body, {
    responseType: "blob",
  })
const getDetailCategory = id => http.get(apiGetDetailCategory + `/${id}`)
const addCategory = body => http.post(apiAddCategory, body)
const changeStatus = body => http.post(apiChangeStatus, body)
const updateCategory = body => http.put(apiUpdateCategory, body)
const deleteCategory = id => http.delete(apiDeleteCategory + `/${id}`)
const getListCategoryInHome = params =>
  http.get(apiGetListCategoryInHome, { params })

const CategoryService = {
  getListCategory,
  getDetailCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  changeStatus,
  getListCategoryInHome,
  exportExcel,
}
export default CategoryService
