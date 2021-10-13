/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-09-15 21:30:18
 */
import { ActionContext } from 'vuex'
import { IUserState } from './state'
import { IStore } from '@/store/types'
import { getUserInfo, login, logout } from "@/api/user";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import { storage } from "@/utils/Storage";
import type { User_Info, loginResult } from './types'
import router from '@/router'
import store from '@/store'
export const actions = {
    // 登录
    async login({ commit, dispatch }: ActionContext<IUserState, IStore>, userInfo) {
        try {
            const response: loginResult = await login(userInfo)
            if (response) {
                const { token } = response.token
                storage.set(ACCESS_TOKEN, token)
                //vuex存储token/username/roles(持久)
                commit('SetToken', token)
                //vuex存储临时变量,标记是否登录
                commit('IsLogin', true)
                //获取用户信息
                await dispatch('getUserInfo')
                //获取license
                await store.dispatch('license/getLicense')
            }
            return Promise.resolve(response)
        } catch (e) {
            return Promise.reject(e)
        }
    },

    // 获取用户信息
    async getUserInfo({ commit }: ActionContext<IUserState, IStore>) {
        const userInfo: User_Info = await getUserInfo();
        if (userInfo) {
            commit('SetUserInfo', userInfo)
            commit('IsLogin', true)
            return Promise.resolve(userInfo)
        }
        return Promise.resolve('')

    },

    // 登出
    async logout({ commit }: ActionContext<IUserState, IStore>) {
        await logout()
        commit('SetToken', '')
        commit('SetUserInfo', {})
        commit('IsLogin', false)
        storage.remove(ACCESS_TOKEN)
        router.replace({
            name: 'login',
        })
        window.location.reload()
        return Promise.resolve('')
    }
}
