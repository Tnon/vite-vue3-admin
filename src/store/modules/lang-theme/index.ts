/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-08-18 18:29:26
 */
import { state } from './state';
import { mutations } from './mutations'
export type { ILangThemeState } from './state'
export default {
    namespaced: true,
    state,
    mutations,
};
