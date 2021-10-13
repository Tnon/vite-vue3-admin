/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2021-08-23 10:35:32
 */
import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";
/**
 * 不需要授权就可以访问的页面
 */
const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/shared/login/index.vue')
    },
    {
        path: '/download',
        name: 'download',
        component: () => import('@/views/shared/download/index.vue')
    },
    {
        path: '/adaptation',
        name: 'adaptation',
        redirect: '/adaptation/agent',
        component: markRaw(RouterTransition),
        children: [
            {
                path: '',
                name: 'adaptation-index',
                redirect: '/adaptation/agent',
                component: () => import('@/views/shared/adaptation/index.vue'),
                children: [
                    {
                        path: 'agent',
                        name: 'adaptation-agent',
                        component: () => import('@/views/shared/adaptation/agent/index.vue'),
                        meta: {
                            title: 'agent&驱动库',
                            type: 'agent'
                        }
                    },
                    {
                        path: 'env',
                        name: 'adaptation-env',
                        component: () => import('@/views/shared/adaptation/env/index.vue'),
                        meta: {
                            title: '运行环境库',
                            type: 'env'
                        }
                    },
                    {
                        path: 'behavior',
                        name: 'adaptation-behavior',
                        component: () => import('@/views/shared/adaptation/behavior/index.vue'),
                        meta: {
                            title: '行为库',
                            type: 'behavior'
                        }
                    }
                ]
            }
        ]
    }
]

export default routes
