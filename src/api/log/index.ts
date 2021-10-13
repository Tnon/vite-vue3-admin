import http from '@/utils/http/axios';
enum Api {
    memOptions = '/api/admin/oplogtypelist',
    memlogList = '/api/admin/oploglist',
    eveOptions = '/api/admin/eventtypelist',
    evelogList = '/api/admin/eventlist'

}


/**
 * @description: "获取成员日志所有事件"
 */
export function getMemOptions() {
    return http.request({
        url: Api.memOptions,
        method: 'GET',
    });
}
/**
 * @description: "获取成员日志略表"
 */
export function getMemLogList(params: tableParams<{ data_range: string, search_data: string, mod: string }>) {
    if (params.filter.mod) {
        params.filter.mod = params.filter.mod[params.filter.mod.length - 1]
    }
    return http.request({
        url: Api.memlogList,
        method: 'POST',
        params
    });
}


/**
 * @description: "获取行为日志所有事件"
 */
export function getEveOptions() {
    return http.request({
        url: Api.eveOptions,
        method: 'GET',
    });
}
/**
 * @description: "获取成员日志略表"
 */
export function getEveLogList(params: tableParams<{ data_range: string, search_data: string, mod: string }>) {
    if (params.filter.mod) {
        params.filter.mod = params.filter.mod[params.filter.mod.length - 1]
    }
    return http.request({
        url: Api.evelogList,
        method: 'POST',
        params
    });
}