import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";

const routeName = 'log'
// type hideMe = { hideMenu?: boolean };
const routes: Array<RouteRecordRaw> = [
    {
        path: '/log',
        name: routeName,
        redirect: '/log/member',
        component: markRaw(RouterTransition),
        meta: {
            title: 'menu.log',
        },
        children: [
            {
                path: '',
                name: `${routeName}-index`,
                meta: {
                    title: '日志首页',
                },
                component: () => import(/* webpackChunkName: "log-index" */ '@/views/log/index.vue'),
                children: [
                    {
                        path: 'member',
                        name: `${routeName}-member`,
                        meta: {
                            title: 'log.member',
                            type: 'member'
                        },
                        component: () => import(/* webpackChunkName: "log-index" */ '@/views/log/views/member/index.vue'),
                    },
                    {
                        path: 'behavior',
                        name: `${routeName}-behavior`,
                        meta: {
                            title: 'log.behavior',
                            type: 'behavior'
                        },
                        component: () => import(/* webpackChunkName: "log-detail" */ '@/views/log/views/behavior/index.vue'),
                    },
                ]
            }

        ]
    }
]

export default routes
