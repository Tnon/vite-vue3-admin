/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-23 11:06:14
 * @LastEditTime: 2021-07-23 11:10:07
 */
import { state } from './state';
import { mutations } from './mutations'
export type { IProductLogo } from './state'
export default {
    namespaced: true,
    state,
    mutations,
};
