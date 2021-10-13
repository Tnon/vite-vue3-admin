/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-12 15:59:47
 * @LastEditTime: 2021-07-22 10:30:13
 */
//资产视图
export interface AssetsView {
    name: string
}

//主机视图
export interface HostView {
    ip: string
    osver: string[]
    group_id: number
}

//资产详情视图
export interface AssetsViewDetail {
    name: string
}

//主机详情视图
export interface HostViewDetail {
    id: string
}



//主机列表
export interface HostList {
    osver: string
    online: string
    secure_status: string
    group_id: number
    groups: string
    ip: string
    update_time: string
    tags: string
}

//移动主机参数
export interface MovePara {
    group_id: number
    target_group_id: number
    flag: number
}

//删除主机参数
export interface DelPara {
    id: number,
    move_to: number
}

//删除主机参数
export interface AddPara {
    parentId: number
    name: string
}

//分组重命名
export interface RnamePara {
    group_id: number
    new_name: string
}

//移动主机/删除主机
export interface MoveDelPara {
    group_id?: number | number[]
    host_id_array?: string
    filter?: Partial<HostList>
    exclude?: string
}

//标签
export interface HostTags {
    host_id: string,
    tag: string
}