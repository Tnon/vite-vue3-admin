import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";

const routeName = 'setting'
const routes: Array<RouteRecordRaw> = [{
    path: 'server',
    name: `${routeName}-server`,
    redirect: '/setting/server/basic',
    meta: {
        title: 'setting.server',
        icon: 'reports'
    },
    component: markRaw(RouterTransition),
    children: [
        {
            path: 'basic',
            name: `${routeName}-server-basic`,
            meta: {
                title: 'setting.sbasic',
            },
            component: () => import(/* webpackChunkName: "server-basic" */ '@/views/setting/views/server/basic/index.vue'),
        },
        {
            path: 'backup',
            name: `${routeName}-server-backup`,
            meta: {
                title: 'setting.backup',
            },
            component: () => import(/* webpackChunkName: "server-backup" */ '@/views/setting/views/server/backup/index.vue'),
        },
        {
            path: 'storage',
            name: `${routeName}-server-storage`,
            meta: {
                title: 'setting.storage',
            },
            component: () => import(/* webpackChunkName: "server-storage" */ '@/views/setting/views/server/storage/index.vue'),
        },
    ]
}]
export default routes



