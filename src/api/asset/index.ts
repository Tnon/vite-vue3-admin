/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-08 11:20:35
 * @LastEditTime: 2021-09-04 18:19:59
 */
import http from '@/utils/http/axios';
import * as api_process from './process'
import * as api_port from './port'
import * as api_service from './service'
import * as api_env from './env'
import * as api_kernel from './kernel'
import * as api_account from './account'
export default {
    api_process,
    api_port,
    api_service,
    api_env,
    api_kernel,
    api_account
}
enum Api {
    EXPORTCOMAPI = '/api/expport/',
}
/**
 * @description: "进程/端口/环境变量/内核/服务/账号 统一导出"
 */
export function exportExcel(params: { filter: { name: string } }, type: string) {
    return http.request({
        url: Api.EXPORTCOMAPI + type,
        method: 'POST',
        params
    });
}
