/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-13 17:47:24
 * @LastEditTime: 2021-07-14 10:27:35
 */
import { state } from './state';
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
export type { IHostGroup } from './state'
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};
