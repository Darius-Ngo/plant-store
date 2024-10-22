import { apiGetListProvince, apiGetListDistrict, apiGetListWard } from "./urls"
import http from "../index"

const getListProvince = () => http.get(apiGetListProvince)
const getListDistrict = id => http.get(apiGetListDistrict + id)
const getListWard = id => http.get(apiGetListWard + id)

const RegionService = {
  getListProvince,
  getListDistrict,
  getListWard,
}
export default RegionService
