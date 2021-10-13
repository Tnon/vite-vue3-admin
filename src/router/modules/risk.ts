import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";

const routeName = 'risk'
// type hideMe = { hideMenu?: boolean };
const routes: Array<RouteRecordRaw> = [
    {
        path: '/risk',
        name: routeName,
        redirect: '/risk',
        component: markRaw(RouterTransition),
        meta: {
            title: 'menu.risk',
        },
        children: [
            {
                path: '',
                name: `${routeName}-index`,
                meta: {
                    //首页
                    title: '风险首页',
                },
                component: () => import(/* webpackChunkName: "risk-index" */ '@/views/risk/index.vue'),
            },
        ]
    }
]

export default routes
