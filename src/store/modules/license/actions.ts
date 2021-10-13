/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-10-12 11:48:17
 */
import { ActionContext } from 'vuex'
import { ILicense } from './state'
import { IStore } from '@/store/types'
import { getLicense } from "@/api/system";
export const actions = {
    // 获取license
    async getLicense({ commit }: ActionContext<ILicense, IStore>) {
        try {
            const response: ILicense = await getLicense()
            // let response = {
            //     aCount: 1901,
            //     lic_expired: false,
            //     lic_rmday: 72467,
            //     lic_status: "valid",
            //     nbegintime: "20220805",
            //     nendtime: "20230101",
            //     pcCount: "100000",
            //     predate: false,
            //     servid: "8a48114fd171cbfc323bf19bfe633b75"
            // }
            // let response = {
            //     lic_status: "invalid",
            //     servid: "8a48114fd171cbfc323bf19bfe633b75"
            // }
            if (response) {
                commit('SetLicense', response)
            }
            return Promise.resolve(response)
        } catch (e) {
            return Promise.reject(e)
        }
    },
}
