/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2021-07-27 21:25:02
 */
import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";

const routeName = 'attack'
// type hideMe = { hideMenu?: boolean };
const routes: Array<RouteRecordRaw> = [
    {
        path: '/attack',
        name: routeName,
        redirect: '/attack',
        component: markRaw(RouterTransition),
        meta: {
            title: 'menu.attack',
        },
        children: [
            {
                path: '',
                name: `${routeName}-index`,
                meta: {
                    //首页
                    title: '攻击首页',
                },
                component: () => import(/* webpackChunkName: "attack-index" */ '@/views/attack/index.vue'),
            },

        ]
    }
]

export default routes
