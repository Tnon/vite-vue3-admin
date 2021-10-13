/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2021-09-29 11:33:20
 */
import { RouteRecordRaw } from 'vue-router'
import { RouterTransition } from '@/components/transition'
import { markRaw } from "vue";
const routeName = 'strategy'

const routes: Array<RouteRecordRaw> = [
    {
        path: 'security',
        name: `${routeName}-security-tst`,
        meta: {
            title: 'strategy.security',
            showOnly: true
        },
        redirect: '/strategy/security',
        component: markRaw(RouterTransition),
        children: [
            {
                path: '',
                name: `${routeName}-security-index`,
                meta: {
                    title: '安全防护策略',
                    selectedKeys: `${routeName}-security-tst`,
                },
                component: () => import(/* webpackChunkName: "strategy-security" */ '@/views/strategy/views/security/index.vue'),

            },
            {
                path: 'detail',
                name: `${routeName}-security-detail`,
                meta: {
                    title: '创建安全防护策略',
                    selectedKeys: `${routeName}-security-tst`,
                },
                component: () => import(/* webpackChunkName: "strategy-detail" */ '@/views/strategy/views/security/detail/index.vue')
            },
        ]
    },
    {
        path: 'domain',
        name: `${routeName}-domain-tst`,
        redirect: '/strategy/domain',
        meta: {
            title: 'strategy.domain',
            showOnly: true
        },
        component: markRaw(RouterTransition),
        children: [
            {
                path: '',
                name: `${routeName}-domain-index`,
                meta: {
                    title: '域控策略',
                    selectedKeys: `${routeName}-domain-tst`,
                },
                component: () => import(/* webpackChunkName: "strategy-domain" */ '@/views/strategy/views/domain/index.vue'),

            },
            {
                path: 'detail',
                name: `${routeName}-domain-detail`,
                meta: {
                    title: '创建预控策略',
                    selectedKeys: `${routeName}-domain-tst`,
                },
                component: () => import(/* webpackChunkName: "strategy-detail" */ '@/views/strategy/views/domain/detail/index.vue')
            },
        ]
    },

    {
        path: 'attacklist',
        name: `${routeName}-attacklist-tst`,
        meta: {
            title: 'strategy.attacklist',
            showOnly: true
        },
        redirect: '/strategy/attacklist',
        component: markRaw(RouterTransition),
        children: [
            {
                path: '',
                name: `${routeName}-attacklist-index`,
                meta: {
                    title: '攻击黑白名单',
                    selectedKeys: `${routeName}-attacklist-tst`,
                },
                component: () => import(/* webpackChunkName: "strategy-attacklist" */ '@/views/strategy/views/attack/index.vue'),

            }
        ]
    },
    // {
    //     path: 'risklist',
    //     name: `${routeName}-risklist-tst`,
    //     meta: {
    //         title: '风险黑白名单',
    //         showOnly: true
    //     },
    //     redirect: '/strategy/risklist',
    //     component: markRaw(RouterTransition),
    //     children: [
    //         {
    //             path: '',
    //             name: `${routeName}-risklist-index`,
    //             meta: {
    //                 title: '风险黑白名单',
    //                 selectedKeys: `${routeName}-risklist-tst`,
    //             },
    //             component: () => import(/* webpackChunkName: "strategy-risklist" */ '@/views/strategy/views/risk/index.vue'),

    //         }
    //     ]
    // },

    {
        path: 'filelist',
        name: `${routeName}-filelist-tst`,
        meta: {
            title: 'strategy.filelist',
            showOnly: true
        },
        redirect: '/strategy/filelist',
        component: markRaw(RouterTransition),
        children: [
            {
                path: '',
                name: `${routeName}-filelist-index`,
                meta: {
                    title: '文件黑白名单',
                    selectedKeys: `${routeName}-filelist-tst`,
                },
                component: () => import(/* webpackChunkName: "strategy-fileList" */ '@/views/strategy/views/file/index.vue'),

            }
        ]
    },
    {
        path: 'account',
        name: `${routeName}-account-tst`,
        meta: {
            title: 'strategy.account',
            showOnly: true
        },
        redirect: '/strategy/account',
        component: markRaw(RouterTransition),
        children: [
            {
                path: '',
                name: `${routeName}-account-index`,
                meta: {
                    title: '账户策略',
                    selectedKeys: `${routeName}-account-tst`,
                },
                component: () => import(/* webpackChunkName: "strategy-account" */ '@/views/strategy/views/account/index.vue'),

            }
        ]
    },


]
export default routes