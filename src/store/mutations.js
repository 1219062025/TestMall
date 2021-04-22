export default {
  // 购物车添加商品
  addCart(state, payload) {
    payload.product.count = 1
    state.cartList.push(payload.product)
  },
  // 商品数加一
  incCart(state, payload) {
    payload.count++
  }
}