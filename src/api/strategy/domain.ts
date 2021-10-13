/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-06 18:06:12
 * @LastEditTime: 2021-10-12 15:48:24
 */
import http from '@/utils/http/axios';
enum Api {
    domainList = '/gapi/policies/domains/list',
    addDomainList = '/gapi/policies/domains',
    domainDetail = '/gapi/policies/domains',
    modifyDetail = '/gapi/policies/domains/modify',
    delRecord = '/gapi/policies/domains'
}
import { AddDomainPara } from './model'

/**
 * @description: "获取域控策略列表"
 */
export function getDomainList(params: tableParams<{ name: string }>) {
    return http.request({
        url: Api.domainList,
        method: 'POST',
        params
    });
}

/**
 * @description: "添加域控策略"
 */
export function addDomain(params: AddDomainPara) {
    return http.request({
        url: Api.addDomainList,
        method: 'POST',
        params
    }, {
        successMessageText: 'addSuc'
    });
}

/**
 * @description: "获取域控策略详情"
 */
export function getDomainDetail(params: number) {
    return http.request({
        url: Api.domainDetail,
        method: 'GET',
        params
    });
}

/**
 * @description: "修改域控策略"
 */
export function updateSercuity(params: AddDomainPara) {
    return http.request({
        url: Api.modifyDetail,
        method: 'POST',
        params
    }, {
        successMessageText: 'modSuc'
    });
}

/**
 * @description: "删除域控策略"
 */
export function delDomain(params: { id_string: string }) {
    return http.request({
        url: Api.delRecord,
        method: 'DELETE',
        params
    },
        {
            successMessageText: 'delSuc'
        });
}