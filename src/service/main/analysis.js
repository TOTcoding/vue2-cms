import { request } from "../request";

export function getAmountList() {
  return request({
    method: 'GET',
    url: '/goods/amount/list'
  })
}
export function getCategoryGoodsCount() {
  return request({
    method: 'GET',
    url: '/goods/category/count'
  })
}
export function getCategoryGoodsSale() {
  return request({
    method: 'GET',
    url: '/goods/category/sale'
  })
}
export function getCategoryGoodsFavor() {
  return request({
    method: 'GET',
    url: '/goods/category/favor'
  })
}
export function getGoodsSaleTop10() {
  return request({
    method: 'GET',
    url: '/goods/sale/top10'
  })
}
export function getGoodsAddressSale() {
  return request({
    method: 'GET',
    url: '/goods/address/sale'
  })
}