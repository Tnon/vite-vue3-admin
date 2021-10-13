/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-23 11:06:14
 * @LastEditTime: 2021-07-23 11:09:41
 */
import { IProductLogo } from './state'

export const mutations = {
    SetProductLogo: (state: IProductLogo, url: string) => {
        state.logoUrl = url
    },
    SetProductVersion: (state: IProductLogo, version: string) => {
        state.productVersion = version
    },
}