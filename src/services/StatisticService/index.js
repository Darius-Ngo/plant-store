import {
  apiGetStatisticOrder,
  apiGetStatisticProductTrend,
  apiGetStatisticByCategory,
} from "./urls"
import http from "../index"

const getStatisticOrder = body => http.post(apiGetStatisticOrder, body)
const getStatisticProductTrend = body =>
  http.post(apiGetStatisticProductTrend, body)
const getStatisticByCategory = body =>
  http.post(apiGetStatisticByCategory, body)

const StatisticService = {
  getStatisticOrder,
  getStatisticProductTrend,
  getStatisticByCategory,
}
export default StatisticService
