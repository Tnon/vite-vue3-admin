/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:32
 * @LastEditTime: 2021-07-04 16:13:06
 */
/**
 * @description: 登陆接口参数
 */
export interface LoginParams {
  username: string;
  password: string;
}
/**
 * @description: 登录接口返回值
 */
export interface LoginResultModel {
  // 用户id
  userId: string | number;
  // token
  token: string;
}
/**
 * @description: 获取用户
 */
export interface UserList {
  search_data: string;
}
