/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-29 18:59:52
 * @LastEditTime: 2021-10-12 17:34:05
 */
import { TableColumn } from "@/types/tableColumn";
import { createVNode } from 'vue'
import treeGroup from './cmts/treeGroup'
import hostIp from '@/components/host-ip'
import saftyStatus from '@/components/safty-status'
import hostOnline from '@/components/host-online'
import customTag from '@/components/custom-tag'
export const useColumns = (T): TableColumn[] => [
    {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 240,
        sorter: true,
        customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
    },
    {
        title: T('asset.safeStau'),
        width: 160,
        dataIndex: '',
        customRender: ({ record }) => createVNode(saftyStatus, { attacked_count: record.attacked_count, risk_count: record.risk_count, ip: record.ip })

    },
    {
        title: T('common.onlineStau'),
        width: 160,
        dataIndex: 'online',
        customRender: ({ text: online }) => createVNode(hostOnline, { online })
    },
    {
        title: T('common.tag'),
        width: 180,
        dataIndex: 'tag',
        slots: {
            customRender: 'tag'
        },
        slotsType: 'component',
        slotsFunc: ({ tag, host_id }, callback) => createVNode(customTag, { tag, host_id, callback })
    },
    {
        title: T('common.group'),
        width: 540,
        dataIndex: 'group_kv_path',
        customRender: ({ text: group_kv_path }) => createVNode(treeGroup, { group_kv_path })
    },
    {
        // title: '更新时间',
        width: 200,
        key: 'last_offline_at',
        dataIndex: 'last_offline_at',
        slots: {
            title: 'customTitle'
        }
    },

]