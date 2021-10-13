/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-12 15:47:23
 */
import http from '@/utils/http/axios';
enum Api {
    weakpwds = '/api/admin/setweakpwd',
    getweakpwds = '/api/admin/getweakpwd',
    getipTimes = '/api/admin/getloktimes',
    setipTimes = '/api/admin/setloktimes'
}


/**
 * @description: "获取弱密码字典"
 */
export function getWeakPwds() {
    return http.request({
        url: Api.getweakpwds,
        method: 'GET',
    });
}
/**
 * @description: "保存弱密码字典"
 */
export function saveWeakPwds(params: { weakpwds: string[] }) {
    return http.request({
        url: Api.weakpwds,
        method: 'POST',
        params
    }, {
        successMessageText: 'saveSuc'
    });
}

/**
 * @description: "获取ip登录次数"
 */
export function getIpTimes() {
    return http.request({
        url: Api.getipTimes,
        method: 'GET',
    });
}
/**
 * @description: "保存ip登录次数"
 */
export function setIpTimes(params: { freq: number }) {
    return http.request({
        url: Api.setipTimes,
        method: 'POST',
        params
    }, {
        successMessageText: 'saveSuc'
    });
}