import http from "../index"

const getListOrder = user_id => http.get(`orders/${user_id}`)
const addOrder = body => http.post('orders', body)
const updateOrder = (order_id, body) => http.put(`orders/${order_id}`, body)

const OrderService = {
  getListOrder,
  addOrder,
  updateOrder,
}
export default OrderService
