/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-16 10:35:54
 * @LastEditTime: 2021-07-19 11:39:26
 */
import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";

const routeName = 'report'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/report',
        name: routeName,
        redirect: '/report/manage',
        component: markRaw(RouterTransition),
        meta: {
            title: 'menu.report',
        },
        children: [
            {
                path: '',
                name: `${routeName}-index`,
                meta: {
                    title: '报告首页',
                },
                component: () => import(/* webpackChunkName: "report-index" */ '@/views/report/index.vue'),
                children: [
                    {
                        path: 'manage',
                        name: `${routeName}-manage`,
                        meta: {
                            title: 'report.manage',
                            type: 'manage'
                        },
                        component: () => import(/* webpackChunkName: "report-manage" */ '@/views/report/views/manage/index.vue'),
                    },
                    {
                        path: 'sub',
                        name: `${routeName}-sub`,
                        meta: {
                            title: 'report.sub',
                            type: 'sub'
                        },
                        component: () => import(/* webpackChunkName: "report-sub" */ '@/views/report/views/sub/index.vue'),
                    },
                ]
            }

        ]
    }
]

export default routes
