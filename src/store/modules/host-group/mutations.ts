/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-13 17:47:25
 * @LastEditTime: 2021-07-15 11:23:26
 */
import { IHostGroup, ResponseType } from './state'

export const mutations = {
    SetHostGroup: (state: IHostGroup, group: ResponseType) => {
        state.hostGroup = group
    },
}