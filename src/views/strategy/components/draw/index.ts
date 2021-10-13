/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2021-10-12 18:51:52
 */
import { TableColumn } from '@/types/tableColumn'
import { createVNode } from 'vue'
import hostIp from '@/components/host-ip'
export interface GroupMsg {
  group_id: number
  group_name: string
  policy_id: number
  status: number
}
export const useColumns = (t): TableColumn[] => [
  {
    title: t('common.hostIp'),
    dataIndex: 'ip',
    customRender: ({ record }) => createVNode(hostIp, { host_id: record.mac, ip: record.ip, os: record.os || record.osver, online: record.online })
  },
  {
    title: t('asset.effStau'),
    dataIndex: 'effect_status',
    customRender: ({ text }) => createVNode('span', { style: { color: text ? '#18b666' : '#f8a04c' } }, text ? t('asset.effeVe') : t('asset.notEffe'))
  }
]