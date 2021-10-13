/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-09-29 11:45:48
 */
import { RouteRecordRaw } from "vue-router";
const routeName = 'assets'
const routes: Array<RouteRecordRaw> = [
  {
    path: 'host',
    name: `${routeName}-detail-host`,
    meta: {
      title: 'asset.hostMenu',
      showOnly: true,
      keepIp: true,
      selectedKeys: `${routeName}-detail-host`
    },
    component: () => import(/* webpackChunkName: "assets-detail-host" */ '@/views/assets/views/hostDetail/cmts/host/index.vue'),
  },
  {
    path: 'assets',
    name: `${routeName}-detail-assets`,
    meta: {
      title: 'asset.assetMenu',
      showOnly: true,
      keepIp: true,
      selectedKeys: `${routeName}-detail-assets`
    },
    component: () => import(/* webpackChunkName: "assets-detail-assets" */ '@/views/assets/views/hostDetail/cmts/asset/index.vue'),
  },
  {
    path: 'strategy',
    name: `${routeName}-detail-strategy`,
    meta: {
      title: 'asset.policyMenu',
      showOnly: true,
      keepIp: true,
      selectedKeys: `${routeName}-detail-strategy`
    },
    component: () => import(/* webpackChunkName: "assets-detail-strategy" */ '@/views/assets/views/hostDetail/cmts/rule/index.vue'),
  }
]
export default routes