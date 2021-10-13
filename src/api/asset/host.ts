/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-06 18:06:12
 * @LastEditTime: 2021-10-12 15:08:21
 */
import http from '@/utils/http/axios';
import { HostList, MovePara, DelPara, AddPara, RnamePara, MoveDelPara, HostTags } from './model/assetsModel'
enum Api {
    HOSTLIST = '/gapi/assets/hosts/list',
    STATISTICS = '/gapi/assets/hosts/statistics',
    DETAIL_HOST = '/gapi/assets/hosts',
    GROUPLIST = '/gapi/assets/groups',
    MOVEGROUP = '/gapi/assets/groups/move',
    DELETEGROUP = '/gapi/assets/groups',
    ADDGROUP = '/gapi/assets/groups',
    RENAMEGROUP = '/gapi/assets/groups/rename',
    MOVEHOSTGROUP = '/gapi/assets/hosts/devideintogroup',
    DELHOSTGROUP = '/gapi/assets/hosts/removehosts',
    GETOFFCOUNT = '/gapi/assets/hosts/offlinehostcount',
    HOSTTAGS = '/gapi/assets/hosts/tags',
    HOSTDETAILHEAD = '/gapi/assets/hosts/simple',
    HOSTDETAILPOLICY = '/gapi/assets/hosts/policies',
    offLineHostApi = '/gapi/overview/offlinestatistics',
    exportFileExcel = '/gapi/assets/hosts/export'
}
/**
 * @description: "获取主机资产列表"
 */
export function getHostList(params: tableParams<HostList>) {
    return http.request({
        url: Api.HOSTLIST,
        method: 'POST',
        params
    });
}


/**
 * @description: "获取资产统计信息"
 */
export function getStatistics(params: { group_id: number }) {
    return http.request({
        url: Api.STATISTICS,
        method: 'GET',
        params
    });
}
/**
 * @description: "获取时间段离线主机"
 */
export function getOffLineHost(params: { range: string }) {
    return http.request({
        url: Api.offLineHostApi,
        method: 'POST',
        params
    });
}




/**
 * @description: "获取主机分组"
 */
export function getHostGroups(group_id = -1, exclude_id?: string) {
    return http.request({
        url: Api.GROUPLIST,
        method: 'GET',
        params: {
            group_id,
            exclude_id
        }
    });
}


/**
 * @description: "分组移动"
 */
export function moveGroup(params: MovePara) {
    return http.request({
        url: Api.MOVEGROUP,
        method: 'POST',
        params
    });
}


/**
 * @description: "删除分组"
 */
export function deleteGroup(params: DelPara) {
    return http.request({
        url: Api.DELETEGROUP,
        method: 'DELETE',
        params
    }, {
        successMessageText: 'delGrpSuc',
    });
}


/**
 * @description: "重命名分组"
 */
export function renameGroup(params: RnamePara) {
    return http.request({
        url: Api.RENAMEGROUP,
        method: 'POST',
        params
    });
}

/**
 * @description: "添加分组"
 */
export function addGroup(params: AddPara) {
    return http.request({
        url: Api.ADDGROUP,
        method: 'POST',
        params
    }, {
        successMessageText: 'addGrpSuc',
    });
}


/**
 * @description: "移动主机/删除主机"
 */
export function move_Group(params: MoveDelPara, boolean?: boolean) {
    return http.request({
        url: Api.MOVEHOSTGROUP,
        method: 'POST',
        params
    }, {
        successMessageText: !boolean ? 'moveHostSuc' : '',
    });
}

/**
 * @description: "移动主机/删除主机"
 */
export function del_Group(params: MoveDelPara) {
    return http.request({
        url: Api.DELHOSTGROUP,
        method: 'DELETE',
        params
    }, {
        successMessageText: 'delHostSuc',
        errorMessageText: 'delHostFail'
    });
}


/**
 * @description: "获取离线主机数量"
 */
export function getoffLineNumber(params: HostList) {
    return http.request({
        url: Api.GETOFFCOUNT,
        method: 'POST',
        params
    });
}


/**
 * @description: "添加标签"
 */
export function hostTags(params: HostTags, successMessageText: string) {
    return http.request({
        url: Api.HOSTTAGS,
        method: 'POST',
        params
    }, {
        successMessageText,
    });
}



/**
 * @description: "主机详情头部信息"
 */
export function hostDetailHead(params: string) {
    return http.request({
        url: Api.HOSTDETAILHEAD,
        method: 'GET',
        params
    });
}
/**
 * @description: "获取主机详情"
 * /assets/hosts/{id}
 */
export function HostDetail(params: string) {
    return http.request({
        url: Api.DETAIL_HOST,
        method: 'GET',
        params
    });
}

/**
 * @description: "获取主机详情-资产统计"
 * /assets/hosts/{id}
 */
export function HostDetailAssetStatic(params: string) {
    return http.request({
        url: Api.STATISTICS,
        method: 'GET',
        params
    });
}

/**
 * @description: "获取主机详情-策略"
 * /assets/hosts/{id}
 */
export function getHostPolicy(params: { host_id: string }) {
    return http.request({
        url: Api.HOSTDETAILPOLICY,
        method: 'GET',
        params
    });
}
