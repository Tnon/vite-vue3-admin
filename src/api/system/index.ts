/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:32
 * @LastEditTime: 2021-10-12 15:51:49
 */
import http from '@/utils/http/axios';


enum Api {
  lic = '/api/admin/getlic',
  systemConfig = '/api/admin/system_configs',
  uploadLicense = '/api/upload/lic'
}

/**
 * @description: 获取license
 */
export function getLicense() {
  return http.request({
    url: Api.lic,
    method: 'GET',
    // headers: {
    //   ignoreCancelToken: true,
    // },
  });
}
/**
 * @description: 获取license
 */
export function systemConfig() {
  return http.request({
    url: Api.systemConfig,
    method: 'GET',
  });
}

/**
 * @description: 上传license
 */
export function uoloadLicense(params) {
  return http.request({
    url: Api.uploadLicense,
    method: 'POST',
    params
  }, {
    successMessageText: 'licUpdSuc'
  });
}