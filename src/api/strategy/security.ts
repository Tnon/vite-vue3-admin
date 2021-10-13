/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-06 18:06:12
 * @LastEditTime: 2021-10-12 15:50:49
 */
import http from '@/utils/http/axios';
enum Api {
    sercuityList = '/gapi/policies/risk_switches/list',
    sercuityDetail = '/gapi/policies/risk_switches',
    addRecord = '/gapi/policies/risk_switches',
    delRecord = '/gapi/policies/risk_switches',
    updateRecord = '/gapi/policies/risk_switches/modify',
    StategyApplyList = '/gapi/policies/group_tree',
    StategyList = '/gapi/policies/simple_list',
    setStategyList = '/gapi/policies/apply',
    getEffectOption = '/gapi/policies/apply_detail',
    getEffectHosts = '/gapi/policies/host_apply_list'

}


/**
 * @description: "获取安全防护策略列表"
 */
export function getSercuityList(params: tableParams<{ name: string }>) {
    return http.request({
        url: Api.sercuityList,
        method: 'POST',
        params
    });
}


/**
 * @description: "获取安全防护策略详情"
 */
export function getSercuityDetail(params: number) {
    return http.request({
        url: Api.sercuityDetail,
        method: 'GET',
        params
    });
}
/**
 * @description: "删除安全防护策略"
 */
export function delSercuity(params: { id_string: string }) {
    return http.request({
        url: Api.delRecord,
        method: 'DELETE',
        params
    },
        {
            successMessageText: 'delSuc'
        });
}

/**
 * @description: "新增安全防护策略"
 */
export function addSercuity(params) {
    return http.request({
        url: Api.addRecord,
        method: 'POST',
        params
    }, {
        successMessageText: 'addSuc'
    })
}

/**
 * @description: "修改安全防护策略"
 */
export function updateSercuity(params) {
    return http.request({
        url: Api.updateRecord,
        method: 'POST',
        params
    }, {
        successMessageText: 'modSuc'
    });
}


/**
 * @description: "获取策略应用列表"
 */
export function getStategyApplyList(params: tableParams<{ policy_type: number }>) {
    return http.request({
        url: Api.StategyApplyList,
        method: 'POST',
        params
    });
}
/**
 * @description: "获取策略列表"
 */
export function getStategyList(params: { policy_type: number }) {
    return http.request({
        url: Api.StategyList,
        method: 'GET',
        params
    });
}

/**
 * @description: "策略应用"
 */
export function setStategyList(params: { policy_type: number, switch: { group_id: number, policy_id: number | undefined } }) {
    return http.request({
        url: Api.setStategyList,
        method: 'POST',
        params
    }, {
        successMessageText: 'appSuc'
    });
}


/**
 * @description: 抽屉 获取策略生效时间和数量
 */
export function getEffectOption(params: { group_id: number, policy_type: number }) {
    return http.request({
        url: Api.getEffectOption,
        method: 'POST',
        params
    });
}

/**
 * @description: 抽屉 获取策略生效主机
 */
export function getEffectHosts(params: tableParams<{ group_id: number, policy_type: number }>) {
    return http.request({
        url: Api.getEffectHosts,
        method: 'POST',
        params
    });
}
