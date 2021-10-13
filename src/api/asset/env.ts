/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-06 18:06:12
 * @LastEditTime: 2021-07-12 16:20:45
 */
import http from '@/utils/http/axios';
import { AssetsView, HostView, AssetsViewDetail, HostViewDetail } from './model/assetsModel'
enum Api {
    assetview = '/gapi/assets/environments/assetview',
    assetview_detail = '/gapi/assets/environments/detail/assetview',
    hostview = '/gapi/assets/environments/hostview',
    hostview_detail = '/gapi/assets/environments/detail/hostview',
}

/**
 * @description: "获取环境变量列表：资产视图"
 */
export function getAssetView(params: tableParams<AssetsView>) {
    return http.request({
        url: Api.assetview,
        method: 'POST',
        params
    });
}

/**
 * @description: "获取环境变量祥细列表：资产视图"
 */
export function getAssetViewDetail(params: tableParams<AssetsViewDetail>) {
    return http.request({
        url: Api.assetview_detail,
        method: 'POST',
        params
    });
}

/**
 * @description: "获取环境变量列表：主机视图"
 */
export function getHostView(params: tableParams<HostView>) {
    return http.request({
        url: Api.hostview,
        method: 'POST',
        params
    });
}

/**
 * @description: "获取环境变量祥细列表：资产视图"
 */
export function getHostViewDetail(params: tableParams<HostViewDetail>) {
    return http.request({
        url: Api.hostview_detail,
        method: 'POST',
        params
    });
}
