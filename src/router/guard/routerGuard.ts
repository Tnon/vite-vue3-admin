/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-05 14:39:19
 * @LastEditTime: 2021-08-23 10:33:50
 */
import { isNavigationFailure, Router } from 'vue-router'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'
import store from '@/store'
//路由全局白名单
const allowList = ['login', 'error', 'download', 'error-404', 'error-405', 'adaptation-agent']
//审计管理员白名单
const auditAllowList = ['log-member', 'log-behavior', 'report-manage', 'report-sub', 'avatar-index']

const loginRoutePath = '/login'
const defaultRoutePath = '/overview'
const auditDefaultRoutePath = '/log/member'
export function routerGuard(router: Router) {

    router.beforeEach(async (to, from, next) => {
        const u_type = store.state.user.user_info.u_type as number
        const token = storage.get(ACCESS_TOKEN)
        if (token) {
            if (to.name === 'login') {
                if (~~u_type === 2) {
                    next({ path: auditDefaultRoutePath })
                } else {
                    next({ path: defaultRoutePath })
                }
            } else {
                const hasRoute = router.hasRoute(to.name!)
                if (store.state.user.isLogin) {
                    if (allowList.includes(to.name as string) || hasRoute) {
                        //如果是审计管理员
                        if (~~u_type === 2) {
                            if ([...auditAllowList, ...allowList].includes(to.name as string)) {
                                next()
                            } else {
                                next({ path: '/error/405' })
                            }
                        } else {
                            next()
                        }
                    } else {
                        next({ path: '/error' })
                    }
                } else {
                    //获取license
                    await store.dispatch('license/getLicense')
                    const res = await store.dispatch('user/getUserInfo')

                    if (res) {
                        next()
                    } else {
                        store.commit('user/SetToken', '')
                        storage.remove(ACCESS_TOKEN)
                        next({ path: loginRoutePath })
                    }
                }
            }
        } else {
            allowList.includes(to.name as string) ? next() : next({ path: loginRoutePath })
        }
    })

    router.afterEach((to, from, failure) => {
        if (isNavigationFailure(failure)) {
            console.log('failed navigation', failure)
        }
    })

    router.onError(error => {
        console.log(error, '路由错误')
    })

}
