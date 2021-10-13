/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-24 17:15:31
 * @LastEditTime: 2021-10-13 10:32:11
 */
import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";

const routeName = 'setting'
const routes: Array<RouteRecordRaw> = [{
    path: 'currency',
    name: `${routeName}-currency`,
    redirect: '/setting/currency/basic',
    meta: {
        title: 'setting.currency',
        icon: 'laxwin',
    },
    component: markRaw(RouterTransition),
    children: [
        {
            path: 'basic',
            name: `${routeName}-currency-basic`,
            meta: {
                title: 'setting.cbasic',
            },
            component: () => import(/* webpackChunkName: "currency-basic" */ '@/views/setting/views/currency/basic/index.vue'),
        },
        {
            path: 'notice',
            name: `${routeName}-currency-notice`,
            meta: {
                title: 'setting.notice',
            },
            component: () => import(/* webpackChunkName: "currency-notice" */ '@/views/setting/views/currency/notice/index.vue'),
        },

        // {
        //     path: 'groups',
        //     name: `${routeName}-currency-groups`,
        //     meta: {
        //         title: '标签与分组',
        //     },
        //     component: () => import(/* webpackChunkName: "currency-groups" */ '@/views/setting/views/currency/groups/index.vue'),
        // },
        // {
        //     path: 'permissions',
        //     name: `${routeName}-currency-permissions`,
        //     meta: {
        //         title: '角色权限',
        //     },
        //     component: () => import(/* webpackChunkName: "currency-permissions" */ '@/views/setting/views/currency/permissions/index.vue'),
        // },
        {
            path: 'syslog',
            name: `${routeName}-currency-syslog`,
            meta: {
                title: 'setting.syslog',
            },
            component: () => import(/* webpackChunkName: "currency-syslog" */ '@/views/setting/views/currency/syslog/index.vue'),
        },
        {
            path: 'alarm',
            name: `${routeName}-currency-alarm`,
            meta: {
                title: 'setting.serAlar',
            },
            component: () => import(/* webpackChunkName: "currency-alarm" */ '@/views/setting/views/currency/alarm/index.vue'),
        },
        {
            path: 'monitor',
            name: `${routeName}-currency-monitor`,
            meta: {
                title: 'setting.monitor',
            },
            component: () => import(/* webpackChunkName: "currency-monitor" */ '@/views/setting/views/currency/monitor/index.vue'),
        },
    ]
}]
export default routes



