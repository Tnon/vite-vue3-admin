/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-10-08 14:11:40
 */
import { TableColumn } from '@/types/tableColumn'
import hostIp from '@/components/host-ip'
import { createVNode } from "vue";
import memberLog from './index.vue'
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('log.actTime'),
    dataIndex: 'createtime',
    width: 220
  },
  {
    title: t('log.eventName'),
    dataIndex: 'event_type',
    width: 220
  },
  {
    title: t('log.hostIp'),
    dataIndex: 'ip',
    width: 200,
    customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
  },
  {
    title: t('log.logLevel'),
    dataIndex: 'level',
    width: 180
  },
  {
    title: t('log.actDes'),
    dataIndex: 'opexplain',
    width: 300
  },
]
export interface Option {
  value: string;
  label: string;
  children?: Option[];
}
export { memberLog }
