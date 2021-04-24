export default {
  // 点击加入购物车后判断是否已经在购物车里了
  clickCart({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      const item = state.cartList.find(item => item.iid === payload.product.iid)
      if (item) {
        commit("incCart", item)
        resolve("商品数 +1")
      } else if (payload.product.image) {
        commit("addCart", payload)
        resolve("添加到购物车成功")
      }
      else {
        reject("添加到购物车失败！再点试试")
      }
    })
  },
}