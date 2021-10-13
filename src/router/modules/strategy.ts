import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";
import strategyRoutes from './strategy/index'

const routeName = 'strategy'
// type hideMe = { hideMenu?: boolean };
const routes: Array<RouteRecordRaw> = [
    {
        path: '/strategy',
        name: routeName,
        redirect: '/strategy/security',
        component: markRaw(RouterTransition),
        meta: {
            title: 'menu.stragaty',
        },
        children: [
            {
                path: '',
                name: `${routeName}-layout`,
                meta: {
                    title: '策略布局',
                },
                component: () => import(/* webpackChunkName: "strategy-index" */ '@/views/strategy/index.vue'),
                children: [
                    ...strategyRoutes
                ]
            }
        ]
    }
]

export default routes
