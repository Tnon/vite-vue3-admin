/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-29 15:19:59
 * @LastEditTime: 2021-08-17 10:20:32
 */
import advanFilter from './index.vue'
interface FItems {
    label: string
    key: string
    filters: Items[]
}
export const formItems: FItems[] = [
    {
        //安全状态
        label: 'asset.safeStau',
        key: 'swtStatus',
        filters: [
            {
                title: 'common.all',
                type: ''
            },
            {
                title: 'common.healthy',
                type: '0'
            },
            {
                title: 'common.attacked',
                type: '1'
            },
            {
                title: 'common.atRisk',
                type: '2'
            }
        ]
    },
    {
        //在线状态
        label: 'common.onlineStau',
        key: 'swtOnline',
        filters: [
            {
                title: 'common.all',
                type: ''
            },
            {
                title: 'common.onLine',
                type: '1'
            },
            {
                title: 'common.offLine',
                type: '0'
            }
        ]
    },
    {
        // 操作系统
        label: 'common.system',
        key: 'swtSystem',
        filters: [
            {
                title: 'common.all',
                type: ''
            },
            {
                title: 'Windows',
                type: '1'
            },
            {
                title: 'Linux',
                type: '0'
            }
        ]
    }
]

export interface ADprops {
    secure_status: string
    online: string
    osver: string
    groups: string
    group: number
    update_time: string
    swtchecked: boolean
    tags: string
}
export default advanFilter