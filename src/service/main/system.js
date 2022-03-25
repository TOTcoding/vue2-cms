import { request } from '../request'

export function getPageListData(pageUrl, queryInfo) {
  return request({
    method: "POST",
    url: pageUrl,
    data: queryInfo
  })
}
export function deletePageData(pageUrl) {
  return request({
    method: "DELETE",
    url: pageUrl,
  })
}
export function departmentPageData(pageUrl) {
  return request({
    method: "POST",
    url: pageUrl,
  })
}
export function roleGetPageListData(pageUrl, queryInfo) {
  return request({
    method: "POST",
    url: pageUrl,
    data: queryInfo
  })
}

export function goodsGetPageListData(pageUrl, queryInfo) {
  return request({
    method: "POST",
    url: pageUrl,
    data: queryInfo
  })
}

export function createPageData(pageUrl, newData) {
  return request({
    method: 'POST',
    url: pageUrl,
    data: newData
  })
}

export function editPageData(pageUrl, editData, id) {
  return request({
    method: 'PATCH',
    url: `${pageUrl}/${id}`,
    data: editData
  })
}