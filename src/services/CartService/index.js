import http from "../index"

const getListCart = user_id => http.get(`carts/${user_id}`)
const addCart = body => http.post('carts', body)
const addToCart = body => http.post('carts/add', body)
const updateCart = (cart_id, body) => http.put(`carts/${cart_id}`, body)
const deleteCart = cart_id => http.delete(`carts/${cart_id}`)

const CartService = {
  getListCart,
  addCart,
  addToCart,
  updateCart,
  deleteCart,
}
export default CartService
