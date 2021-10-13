/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-11 20:53:56
 * @LastEditTime: 2021-10-12 15:47:33
 */
import http from '@/utils/http/axios';
enum Api {
    attackList = '/gapi/risk/queryblackwhitelist',
    delAttackList = '/gapi/risk/deleteblackwhiteitems'
}


/**
 * @description: "攻击黑白名单列表"
 */
export function getAttackList(params: tableParams<{ black: number }>) {
    return http.request({
        url: Api.attackList,
        method: 'POST',
        params
    });
}

/**
 * @description: "删除攻击黑白名单列表"
 */
export function delAttackList(params: { list: { contentmd5: string, dtype: number, black: number, osver: string }[] }) {
    return http.request({
        url: Api.delAttackList,
        method: 'POST',
        params
    }, {
        successMessageText: 'delSuc'
    });
}