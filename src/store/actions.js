export default {
  // 点击加入购物车后判断是否已经在购物车里了
  clickCart({ commit, state }, payload) {
    const item = state.cartList.find(item => item.iid === payload.product.iid)
    item ? commit("incCart", item) : commit("addCart", payload)
  },
}