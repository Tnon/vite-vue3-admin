/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-18 12:19:10
 * @LastEditTime: 2021-10-12 17:52:03
 */
import { TableColumn } from "@/types/tableColumn";
import hostIp from '@/components/host-ip'
import { createVNode } from 'vue'
export const useColumns = (T): TableColumn[] => [
    {
        title: T('overview.lastAttack'),
        dataIndex: 'update_at',
        width: 220

    },
    {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 240,
        customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
    },
    {
        title: T('arcomn.attackType'),
        dataIndex: 'dtype',
        width: 200,
        customRender: ({ record }) => createVNode('span', { class: 'attRskType' }, record.dtypename)
    },


]