/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-13 14:56:18
 * @LastEditTime: 2021-08-25 14:27:34
 */

interface PackageState {
    product_name: string
    //包版本
    package_version: string
    // agent版本
    agent_version: string
    //驱动库版本
    driver_version: string
    //更新时间
    created_at: string
    //包大小
    package_size: string
    //适用系统
    supports: string
    //是否可以撤回
    enable_recall: boolean
}
export interface SwiSta {
    actived: 'agent' | 'driver'
    showDetail: boolean
}
export type OsType = Record<'Windows' | 'Linux', PackageMsg>

export type PackageMsg = Partial<PackageState>