/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:32
 * @LastEditTime: 2021-10-12 15:52:20
 */
import http from '@/utils/http/axios';

import {
  LoginParams,
  UserList
} from './model/userModel';

enum Api {
  login = '/api/login',
  logout = '/api/logout',
  current = '/api/admin/users/current_user',
  users = '/api/admin/users',
  addUsers = '/api/admin/addusers',
  delUsers = '/api/admin/delseluser',
  switchEnable = '/api/common_switch_enable',
  updateUser = '/api/admin/update_users/',
  updateUserPassword = '/api/admin/update_users/',
  updateDept = '/api/admin/users/',
  updateMobile = '/api/admin/users/',
  upadteTelphone = '/api/admin/users/'
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: Api.current,
    method: 'GET',
    // headers: {
    //   ignoreCancelToken: true,
    // },
  });
}

/**
 * @description: 用户登录
 */
export function login(params: LoginParams) {
  return http.request({
    url: Api.login,
    method: 'POST',
    params,
  }, {
    successMessageText: 'loginSuc'
  });
}

/**
 * @description: 用户登出
 */
export function logout() {
  return http.request({
    url: Api.logout,
    method: 'POST',
  });
}

/**
 * @description: 获取用户
 */
export function getUserList(params: tableParams<UserList>) {
  return http.request({
    url: Api.users,
    method: 'POST',
    params
  });
}
/**
 * @description: 添加用户
 */
export function addUser(params) {
  return http.request({
    url: Api.addUsers,
    method: 'POST',
    params
  }, {
    successMessageText: 'addSuc!'
  });
}
/**
 * @description: 删除用户
 */
export function batchDelUsers(params: { useridarr: number[] }) {
  return http.request({
    url: Api.delUsers,
    method: 'POST',
    params
  }, {
    successMessageText: 'delSuc'
  });
}

/**
 * @description: 启用/禁用用户
 */
export function enableUser(params: { id: number, table: string, value: string }) {
  return http.request({
    url: Api.switchEnable,
    method: 'POST',
    params
  });
}

/**
 * @description 编辑用户信息
 */
export function updateUserApi(userId, params) {
  return http.request({
    url: Api.updateUser + userId,
    method: 'PATCH',
    params
  }, {
    successMessageText: 'modSuc'
  })
}

/**
 * @description 修改用户密码
 */
export function updateUserPasswordApi(userId, params) {
  return http.request({
    url: Api.updateUserPassword + userId,
    method: "PATCH",
    params
  }, {
    successMessageText: 'modSuc'
  })
}

/**
 * @description 个人信息/修改部门名称
 */
export function updateDeptApi(userId, params) {
  return http.request({
    url: Api.updateDept + userId,
    method: 'PATCH',
    params
  }, {
    successMessageText: 'modSuc'
  })
}

/**
 * @description 修改电话号码
 */
export function updateMobileApi(userId, params) {
  return http.request({
    url: Api.updateMobile + userId,
    method: 'PATCH',
    params
  }, {
    successMessageText: 'modSuc'
  })
}

/**
 * @description 修改座机号码
 */
export function upadteTelphoneApi(userId, params) {
  return http.request({
    url: Api.upadteTelphone + userId,
    method: 'PATCH',
    params
  }, {
    successMessageText: 'modSuc'
  })
}

/**
 * @description 设置用户密码
 */
export function setUserPasswordApi(userId, params) {
  return http.request({
    url: Api.updateUserPassword + userId,
    method: "PATCH",
    params
  }, {
    successMessageText: 'modSuc'
  })
}
