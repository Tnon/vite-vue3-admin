/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-13 16:44:20
 */
import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";
import assetsRouters from './assets'
const routeName = 'assets'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/assets',
        name: routeName,
        redirect: '/assets/host',
        component: markRaw(RouterTransition),
        meta: {
            title: 'menu.assets',
        },
        children: [
            {
                path: '',
                name: `${routeName}-layout`,
                meta: {
                    title: '资产布局',
                },
                component: () => import(/* webpackChunkName: "assets-layout" */ '@/views/assets/index.vue'),

                children: [
                    ...assetsRouters
                ]
            },


        ],
    }
]

export default routes
