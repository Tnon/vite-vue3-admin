import { RouterTransition } from '@/components/transition'
import { RouteRecordRaw } from 'vue-router'
import { markRaw } from "vue";

const routeName = 'error'

export const notFound: RouteRecordRaw = {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/error/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/shared/error/404.vue')
}

export const errorRoutes: RouteRecordRaw = {
    path: '/error',
    name: routeName,
    redirect: '/error/404',
    component: markRaw(RouterTransition),
    meta: {
        title: '错误页',
        hidden: true
    },
    children: [
        {
            path: '404',
            name: `${routeName}-404`,
            meta: {
                title: '404',
            },
            component: () => import(/* webpackChunkName: "404" */ '@/views/shared/error/404.vue')
        },
        {
            path: '405',
            name: `${routeName}-405`,
            meta: {
                title: '405',
            },
            component: () => import(/* webpackChunkName: "405" */ '@/views/shared/error/405.vue')
        }
    ]
}
