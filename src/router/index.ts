/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2021-09-17 14:54:00
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import shared from './modules/common/shared'
import { errorRoutes } from './modules/common/error'
import common from "@/router/common";
import { createGuard } from './guard'
import { App } from "vue"
export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/overview',
        component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
        meta: {
            title: 'Index'
        },
        children: [
            ...common
        ]
    },
    ...shared,
    errorRoutes,
]

const router = createRouter({
    history: createWebHashHistory(''),
    routes
})
export function setupRouter(app: App) {
    app.use(router)
    createGuard(router)
    return router
}
export default router
