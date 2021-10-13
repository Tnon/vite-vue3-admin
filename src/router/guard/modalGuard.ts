
/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-18 16:30:01
 * @LastEditTime: 2021-09-14 20:04:17
 */
import { Router } from 'vue-router'
import store from '@/store'
export const modalGuard = (router: Router) => {
    router.beforeEach(() => {
        //移除全局弹框
        store.commit('globalModal/SetGlobalModal', null)
    })
    //滚动到顶部
    router.afterEach(() => {
        if (document.getElementsByClassName('layout-content')[0]) {
            document.getElementsByClassName('layout-content')[0].scrollTop = 0
        }
    })
}