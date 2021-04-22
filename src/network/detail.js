import { request } from "./request"
export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid,
    }
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    // 描述
    this.desc = itemInfo.desc
    // 打折后价格
    this.newPrice = itemInfo.lowNowPrice
    // 打折前价格
    this.oldPrice = itemInfo.oldPrice
    // 折扣描述
    this.discount = itemInfo.discountDesc
    this.realPrice = itemInfo.lowNowPrice
    this.columns = columns
    this.services = services
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.cFans = shopInfo.cFans
    this.cSells = shopInfo.cSells
    this.cGoods = shopInfo.cGoods
    this.score = shopInfo.score
  }
}