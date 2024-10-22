import http from "../index"
import {
  apiRateOrder,
  apiGetDetailRate,
  apiGetRateProduct,
  apiGetListRatingProduct,
} from "./urls"

const rateOrder = body => http.post(apiRateOrder, body)
const getDetailRate = params => http.get(apiGetDetailRate, { params })
const getRateProduct = params => http.get(apiGetRateProduct, { params })
const getListRatingProduct = body => http.post(apiGetListRatingProduct, body)

const RateService = {
  rateOrder,
  getDetailRate,
  getRateProduct,
  getListRatingProduct,
}
export default RateService
