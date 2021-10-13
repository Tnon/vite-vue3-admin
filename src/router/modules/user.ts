import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";

const routeName = 'user'
// type hideMe = { hideMenu?: boolean };
const routes: Array<RouteRecordRaw> = [
    {
        path: '/user',
        name: routeName,
        redirect: '/user',
        component: markRaw(RouterTransition),
        meta: {
            title: 'menu.user',
        },
        children: [
            {
                path: '',
                name: `${routeName}-index`,
                meta: {
                    title: '用户首页',
                },
                component: () => import(/* webpackChunkName: "user-index" */ '@/views/user/index.vue'),
            },

        ]
    }
]

export default routes
