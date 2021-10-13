/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-18 16:46:46
 * @LastEditTime: 2021-09-17 14:57:14
 */
import NProgress from 'nprogress' // progress bar
import { Router } from 'vue-router'
import 'nprogress/css/nprogress.css' // 进度条样式
NProgress.configure({ showSpinner: false }) // NProgress Configuration

export const processGuard = (router: Router) => {
    router.beforeEach(() => {
        NProgress.start()
    })
    router.afterEach(() => {

        NProgress.done() // finish progress bar
    })

    router.onError(error => {
        NProgress.done() // finish progress bar
    })
}