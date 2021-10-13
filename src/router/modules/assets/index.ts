import { RouteRecordRaw } from 'vue-router'
import { markRaw } from "vue";
import { RouterTransition } from '@/components/transition'
import assetsDetail from './hostDetail/index'
const routeName = 'assets'
const routes: Array<RouteRecordRaw> = [
    {
        path: 'host',
        name: `${routeName}-host-tst`,
        redirect: '/assets/host',
        meta: {
            title: 'asset.host',
            showOnly: true
        },
        component: markRaw(RouterTransition),
        children: [
            {
                path: '',
                name: `${routeName}-host-index`,
                meta: {
                    title: '主机',
                    selectedKeys: `${routeName}-host-tst`
                },
                component: () => import(/* webpackChunkName: "attack-host" */ '@/views/assets/views/host/index.vue'),
            },
            {
                path: 'detail',
                name: `${routeName}-host-detail`,
                redirect: '/assets/host/detail/host',
                meta: {
                    title: '主机详情',
                    selectedKeys: `${routeName}-host-tst`
                },
                component: () => import(/* webpackChunkName: "assets-layout" */ '@/views/assets/views/hostDetail/index.vue'),
                children: [
                    ...assetsDetail
                ]
            }
        ]
    },
    {
        path: 'process',
        name: `${routeName}-process`,
        redirect: '/assets/process/viewPro',
        meta: {
            title: 'asset.process',
            showOnly: true
        },
        component: markRaw(RouterTransition),
        children: [
            {
                path: 'viewPro',
                name: `${routeName}-process-viewPro`,
                meta: {
                    title: '进程视图',
                    selectedKeys: `${routeName}-process`,
                    type: 'process',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/viewPro/index.vue'),
            },
            {
                path: 'viewIp',
                name: `${routeName}-process-viewIp`,
                meta: {
                    title: '主机视图',
                    selectedKeys: `${routeName}-process`,
                    type: 'process',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/viewIp/index.vue'),
            },
            {
                path: 'detail',
                name: `${routeName}-process-detail`,
                meta: {
                    title: '详情',
                    selectedKeys: `${routeName}-process`,
                    type: 'process',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/detail.vue'),
            },
        ]
    },
    {
        path: 'port',
        name: `${routeName}-port`,
        redirect: '/assets/port/viewPro',
        meta: {
            title: 'asset.port',
            showOnly: true
        },
        component: markRaw(RouterTransition),
        children: [
            {
                path: 'viewPro',
                name: `${routeName}-port-viewPro`,
                meta: {
                    title: '端口视图',
                    selectedKeys: `${routeName}-port`,
                    type: 'port',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/viewPro/index.vue'),
            },
            {
                path: 'viewIp',
                name: `${routeName}-port-viewIp`,
                meta: {
                    title: '主机视图',
                    selectedKeys: `${routeName}-port`,
                    type: 'port',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/viewIp/index.vue'),
            },
            {
                path: 'detail',
                name: `${routeName}-port-detail`,
                meta: {
                    title: '详情',
                    selectedKeys: `${routeName}-port`,
                    type: 'port',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/detail.vue'),
            },
        ]
    },
    {
        path: 'account',
        name: `${routeName}-account`,
        redirect: '/assets/account/viewPro',
        meta: {
            title: 'asset.account',
            showOnly: true
        },
        component: markRaw(RouterTransition),
        children: [
            {
                path: 'viewPro',
                name: `${routeName}-account-viewPro`,
                meta: {
                    title: '账户视图',
                    selectedKeys: `${routeName}-account`,
                    type: 'account',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/viewPro/index.vue'),
            },
            {
                path: 'viewIp',
                name: `${routeName}-account-viewIp`,
                meta: {
                    title: '主机视图',
                    selectedKeys: `${routeName}-account`,
                    type: 'account',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/viewIp/index.vue'),
            },
            {
                path: 'detail',
                name: `${routeName}-account-detail`,
                meta: {
                    title: '详情',
                    selectedKeys: `${routeName}-account`,
                    type: 'account',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/detail.vue'),
            },
        ]
    },
    {
        path: 'service',
        name: `${routeName}-service`,
        redirect: '/assets/service/viewPro',
        meta: {
            title: 'asset.service',
            showOnly: true
        },
        component: markRaw(RouterTransition),
        children: [
            {
                path: 'viewPro',
                name: `${routeName}-service-viewPro`,
                meta: {
                    title: '服务视图',
                    selectedKeys: `${routeName}-service`,
                    type: 'service',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/viewPro/index.vue'),
            },
            {
                path: 'viewIp',
                name: `${routeName}-service-viewIp`,
                meta: {
                    title: '主机视图',
                    selectedKeys: `${routeName}-service`,
                    type: 'service',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/viewIp/index.vue'),
            },
            {
                path: 'detail',
                name: `${routeName}-service-detail`,
                meta: {
                    title: '详情',
                    selectedKeys: `${routeName}-service`,
                    type: 'service',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/detail.vue'),
            },
        ]
    },
    {
        path: 'kernel',
        name: `${routeName}-kernel`,
        redirect: '/assets/kernel/viewPro',
        meta: {
            title: 'asset.kernel',
            showOnly: true
        },
        component: markRaw(RouterTransition),
        children: [
            {
                path: 'viewPro',
                name: `${routeName}-kernel-viewPro`,
                meta: {
                    title: '内核视图',
                    selectedKeys: `${routeName}-kernel`,
                    type: 'kernel',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/viewPro/index.vue'),
            },
            {
                path: 'viewIp',
                name: `${routeName}-kernel-viewIp`,
                meta: {
                    title: '主机视图',
                    selectedKeys: `${routeName}-kernel`,
                    type: 'kernel',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/viewIp/index.vue'),
            },
            {
                path: 'detail',
                name: `${routeName}-kernel-detail`,
                meta: {
                    title: '详情',
                    selectedKeys: `${routeName}-kernel`,
                    type: 'kernel',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/detail.vue'),
            },
        ]
    },
    {
        path: 'env',
        name: `${routeName}-env`,
        redirect: '/assets/env/viewPro',
        meta: {
            title: 'asset.env',
            showOnly: true
        },
        component: markRaw(RouterTransition),
        children: [
            {
                path: 'viewPro',
                name: `${routeName}-env-viewPro`,
                meta: {
                    title: '环境变量视图',
                    selectedKeys: `${routeName}-env`,
                    type: 'env',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/viewPro/index.vue'),
            },
            {
                path: 'viewIp',
                name: `${routeName}-env-viewIp`,
                meta: {
                    title: '主机视图',
                    selectedKeys: `${routeName}-env`,
                    type: 'env',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/viewIp/index.vue'),
            },
            {
                path: 'detail',
                name: `${routeName}-env-detail`,
                meta: {
                    title: '详情',
                    selectedKeys: `${routeName}-env`,
                    type: 'env',
                },
                component: () => import(/* webpackChunkName: "attack-host-viewPro" */ '@/views/assets/views/ppaske/detail.vue'),
            },
        ]
    },
]
export default routes



