/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-31 15:15:19
 * @LastEditTime: 2021-09-02 10:00:45
 */
import http from '@/utils/http/axios';

enum Api {
    periodStatistics = '/gapi/overview/querydurationrisknum',
    logoutintervalinfo = '/gapi/overview/querylogoutintervalinfo',
    attRiskNum = '/gapi/overview/queryrisknum',
    hostTopN = '/gapi/overview/queryriskhosttopn',
    lineCharts = '/gapi/overview/querylinechart'
}

/**
 * @description 期间统计
 */
export function getPeriodStatistics(params: { days: string }) {
    return http.request({
        url: Api.periodStatistics,
        method: 'POST',
        params
    })
}
/**
 * @description 查询登出期间风险与攻击数
 */
export function getNologinDura() {
    return http.request({
        url: Api.logoutintervalinfo,
        method: 'POST',
    })
}

/**
 * @description 查询已/未处理的攻击和风险数
 */
export function getAttRiskNum(params: { handle: number }) {
    return http.request({
        url: Api.attRiskNum,
        method: 'POST',
        params
    })
}


/**
 * @description 危险主机top N
 */
export function dangerHostTopN(params: { count: number, type: number }) {
    return http.request({
        url: Api.hostTopN,
        method: 'POST',
        params
    })
}
/**
 * @description 折线图 interval:期间  1/7/30   type:1攻击 2风险
 */
export function getLineData(params: { interval: number, type: number }) {
    return http.request({
        url: Api.lineCharts,
        method: 'POST',
        params
    })
}