import { request } from "./request"
export function getDetailGoods(iid) {
  return request({
    url: "/detail",
    params: {
      iid,
    }
  })
}