/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-08-22 20:44:08
 */
import { AxiosRequestConfig } from 'axios';
import { AxiosTransform } from './axiosTransform';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  prefixUrl?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export interface RequestOptions {
  // 成功的文本信息
  successMessageText?: string;
  // 错误的文本信息
  errorMessageText?: string;
  // 接口地址
  apiUrl?: string;
  // 错误消息提示类型
  messageMode?: 'none' | 'modal';

}

export interface Result<T = any> {
  code: number;
  type?: 'success' | 'error' | 'warning';
  message: string;
  result?: T;
}
