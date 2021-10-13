/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-07 19:52:38
 * @LastEditTime: 2021-07-12 11:32:30
 */
import { Moment } from 'moment';
export interface ContentProps {
    group_id: number
}
export interface Agus {
    //健康状态
    secure_status: string
    //在线离线
    online: string
    //系统
    osver: string
    //高级筛选的分组
    groups: string
    //高级筛选的日期
    update_time: string
    //搜索
    ip: string
    //标签
    tags: string[]
    //组
    group_id: number
}

