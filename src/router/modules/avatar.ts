import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";

const routeName = 'avatar'
// type hideMe = { hideMenu?: boolean };
const routes: Array<RouteRecordRaw> = [
    {
        path: '/avatar',
        name: routeName,
        redirect: '/avatar',
        component: markRaw(RouterTransition),
        meta: {
            title: '个人中心',
            hidden: 'true'
        },
        children: [
            {
                path: '',
                name: `${routeName}-index`,
                meta: {
                    title: '设置首页',
                },
                component: () => import(/* webpackChunkName: "avatar-index" */ '@/views/avatar/index.vue'),
            }

        ]
    }
]

export default routes
