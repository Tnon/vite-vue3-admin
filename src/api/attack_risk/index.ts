/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-26 10:26:26
 * @LastEditTime: 2021-10-12 15:36:39
 */

import http from '@/utils/http/axios';
import { TreeParams, Tableparams, HandleRecord, MsgTimeLine, BlackWhiteRecord } from './model'

enum Api {
    getTree = '/gapi/risk/queryrisktreelist',
    getList = '/gapi/risk/queryriskinfo',
    handleRecord = '/gapi/risk/sethandleflag',
    getDtypePathinfo = '/gapi/risk/getdtypepathinfo',
    getMsgTimeline = '/gapi/risk/queryoneriskinfo',
    handleRecordBlackWhite = '/gapi/risk/setriskblackwhite',
    exportFileExcel = 'api/export/riskinfo'

}

/**
 * @description: 获取攻击/风险树
 */
export function getTreeDataApi(params: TreeParams) {
    return http.request({
        url: Api.getTree,
        method: 'POST',
        params
    });
}

/**
 * @description: 获取攻击/风险列表
 */
export function getTableList(params: tableParams<Tableparams>) {
    return http.request({
        url: Api.getList,
        method: 'POST',
        params
    });
}

/**
 * @description: 处理攻击和风险
 */
export function handleAttackRisk(params: HandleRecord) {
    return http.request({
        url: Api.handleRecord,
        method: 'POST',
        params
    }, {
        successMessageText: 'proceSuc'
    });
}
/**
 * @description: 抽屉 获取动态信息和时间轴
 */
export function getDrawDetailMsg(params: MsgTimeLine) {
    return http.request({
        url: Api.getMsgTimeline,
        method: 'POST',
        params
    });
}

/**
 * @description: 加白攻击和风险
 */
export function whtblkAttackRisk(params: BlackWhiteRecord) {
    return http.request({
        url: Api.handleRecordBlackWhite,
        method: 'POST',
        params
    }, {
        successMessageText: !!params.black ? 'blakSuc' : 'whitSuc'
    });
}

/**
 * @description: 导出
 */
export function exportFileExcel(params: { filter: Tableparams }) {
    return http.request({
        url: Api.exportFileExcel,
        method: 'POST',
        params
    });
}



