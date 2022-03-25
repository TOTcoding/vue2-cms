import { request } from "./request"

export function accountLoginRequest(account) {
  return request({
    method: "POST",
    url: '/login',
    data: account
  })
}

export function requestUserInfoById(id) {
  return request({
    method: "GET",
    url: '/users/' +id
  })
}

export function requestUserMenusByRoleId(roleId) {
  return request({
    method: "GET",
    url: '/role/' + roleId + '/menu'
  })
}