/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-08-11 09:41:06
 */
import { IUserState } from './state'
import type { User_Info } from './types'
export const mutations = {
    SetToken: (state: IUserState, token: string) => {
        state.token = token
    },
    SetUserInfo: (state: IUserState, user_info: User_Info) => {
        state.user_info = user_info
    },
    IsLogin: (state: IUserState, isLogin: boolean) => {
        state.isLogin = isLogin
    },
    SetUserInfoAvatar: (state: IUserState, url: string) => {
        state.user_info.head_image = url
    },

}
