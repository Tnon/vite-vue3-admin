import { RouteRecordRaw } from 'vue-router'
import cuserag from './settings'
const routeName = 'setting'
// type hideMe = { hideMenu?: boolean };
const routes: Array<RouteRecordRaw> = [
    {
        path: '/setting',
        name: routeName,
        redirect: '/setting/currency',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/setting/index.vue'),
        meta: {
            title: '设置首页',
            hidden: 'true'
        },
        children: [
            ...cuserag
        ]
    }
]

export default routes
