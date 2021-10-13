/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-08-23 11:26:55
 */
import { TableColumn } from "@/types/tableColumn";
import handMove from '../cmts/handMove'
import { migStatus } from '../cmts/migStatus'
import { createVNode } from 'vue'
import hostIp from '@/components/host-ip'
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('setting.migHost'),
    dataIndex: 'host_id',
    width: 200,
    customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
  },
  {
    title: t('setting.manaUrl'),
    dataIndex: 'migrate_destination'
  },
  {
    title: t('setting.migration'),
    dataIndex: 'migrate_status',
    customRender: ({ text }) => createVNode(migStatus, { status: text })
  },
  {
    title: t('setting.migRecord'),
    dataIndex: 'migrate_info'
  },
  {
    title: t('setting.manMig'),
    dataIndex: 'actMig',
    slots: {
      customRender: 'actMig'
    },
    slotsType: 'component',

    slotsFunc: ({ migrate_status, host_id }, reload) => createVNode(handMove, { migrate_status, host_id, reload })
  }
]