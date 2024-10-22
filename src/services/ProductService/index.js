import http from "../index"
import { apiGetListProduct, apiGetProductByFilters } from "./urls"

const getListProducts = params => http.get(apiGetListProduct, { params })
const getProductByFilters = params =>
  http.get(apiGetProductByFilters, { params })
const ProductService = {
  getListProducts,
  getProductByFilters,
}
export default ProductService
