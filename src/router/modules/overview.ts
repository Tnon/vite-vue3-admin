/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2021-09-15 21:43:59
 */
import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";
const routeName = 'overview'
const routes: Array<RouteRecordRaw> = [{
    path: '/overview',
    name: routeName,
    redirect: '/overview',
    component: markRaw(RouterTransition),
    meta: {
        title: 'menu.overview',
    },
    children: [
        {
            path: '',
            name: `${routeName}-index`,
            meta: {
                //首页
                title: '总览首页',
            },
            component: () => import(/* webpackChunkName: "overview-index" */ '@/views/overview/index.vue')
        },
    ]

}]
export default routes
