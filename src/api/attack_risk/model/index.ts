/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-26 10:28:57
 * @LastEditTime: 2021-08-23 14:11:16
 */
interface TreeParams {
    type: number,
    handle: number,
    deep: number
}
interface Tableparams {
    searchdata: string,
    handledlist: string,
    risksrclist: string,
    iplist: string,
    dtypelist: string,
    grouplist: string,
    taglist: string,
    daterange: string,
    riskpath: string,
    handle: number
}

interface HandleRecord {
    filter?: Tableparams
    isall: boolean
    riskinfolist: {
        host_id: string
        content_md5: string
        dtype: number
    }[]
}
interface BlackWhiteRecord {
    riskinfo: {
        host_id: string
        content_md5: string
        dtype: number
    }
    black: number
    description: string
    osver: string
}

interface MsgTimeLine {
    filter: {
        host_id: string
        content_md5: string
        dtype: number
        handle: number
        create_at: string
        dtypesub: number
    }
    page: {
        page_index: number,
        page_size: number
    }
}

export { TreeParams, Tableparams, HandleRecord, MsgTimeLine, BlackWhiteRecord }