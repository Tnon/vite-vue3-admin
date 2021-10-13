/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2021-08-20 11:22:13
 */
import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";

const routeName = 'setting'
const routes: Array<RouteRecordRaw> = [{
    path: 'agent',
    name: `${routeName}-agent`,
    redirect: '/setting/agent/basic',
    meta: {
        title: 'setting.agent',
        icon: 'logs'
    },
    component: markRaw(RouterTransition),
    children: [
        {
            path: 'basic',
            name: `${routeName}-agent-basic`,
            meta: {
                title: 'setting.abasic',
            },
            component: () => import(/* webpackChunkName: "agent-basic" */ '@/views/setting/views/agent/basic/index.vue'),
        },
        {
            path: 'driver',
            name: `${routeName}-agent-driver`,
            meta: {
                title: 'setting.driver',
            },
            component: () => import(/* webpackChunkName: "agent-driver" */ '@/views/setting/views/agent/driver/index.vue'),
        },
        {
            path: 'upgrade',
            name: `${routeName}-agent-upgrade`,
            meta: {
                title: 'setting.upgrade',
            },
            component: () => import(/* webpackChunkName: "agent-upgrade" */ '@/views/setting/views/agent/upgrade/index.vue'),
        },
        // {
        //     path: 'env',
        //     name: `${routeName}-agent-env`,
        //     meta: {
        //         title: '环境包管理',
        //     },
        //     component: () => import(/* webpackChunkName: "agent-env" */ '@/views/setting/views/agent/env/index.vue'),
        // },
        // {
        //     path: 'behavior',
        //     name: `${routeName}-agent-behavior`,
        //     meta: {
        //         title: '行为包管理',
        //     },
        //     component: () => import(/* webpackChunkName: "agent-behavior" */ '@/views/setting/views/agent/behavior/index.vue'),
        // },
        {
            path: 'migrate',
            name: `${routeName}-agent-migrate`,
            meta: {
                title: 'setting.migrate',
            },
            component: () => import(/* webpackChunkName: "agent-migrate" */ '@/views/setting/views/agent/migrate/index.vue'),
        },
    ]
}]
export default routes



