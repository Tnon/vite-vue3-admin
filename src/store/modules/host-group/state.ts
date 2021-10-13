/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-13 17:47:25
 * @LastEditTime: 2021-07-15 14:03:53
 */
export interface groupItem {
    name: string
    id: number
    value: string
    number: number
    items?: groupItem[]
}
export interface ResponseType {
    total: number
    groups: groupItem[]
}
export type IHostGroup = {
    hostGroup: ResponseType
};
export const state: IHostGroup = {
    hostGroup: {
        total: 0,
        groups: []
    },
};
