/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-08 22:02:04
 */
import { TableColumn } from "@/types/tableColumn";
import { createVNode } from 'vue'
import hostIp from '@/components/host-ip'
import treeGroup from '@/components/treeGroupNp'
import { upgradeButton } from '@/views/setting/views/agent/upgrade/components'
export const useColumns = (t): TableColumn[] => [
    {
        title: t('common.hostIp'),
        dataIndex: 'ip',
        width: 220,
        sorter: true,
        customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
    },
    {
        title: t('common.system'),
        dataIndex: 'os',
        sorter: true,
        width: 300,
        ellipsis: true
    },
    {
        title: t('common.hostName'),
        dataIndex: 'machinename',
        sorter: true,
        width: 150,
        ellipsis: true
    },
    {
        title: t('setting.belGrp'),
        dataIndex: 'group_kv_path',
        sorter: true,
        width: 150,
        ellipsis: true,
        customRender: ({ text: group_kv_path }) => createVNode(treeGroup, { group_kv_path })
    },
    {
        title: t('common.agentVersion'),
        dataIndex: 'current_version',
        sorter: true,
        width: 150,
        ellipsis: true,

    },
    {
        title: t('setting.upgStau'),
        dataIndex: 'status_text',
        sorter: true,
        width: 200,
        ellipsis: true,
        customRender: ({ text, record }) => createVNode('span', { title: text, style: { color: record.status === 4 || record.status === 5 ? '#F05064' : record.status === 3 ? '#18ba79' : '' } }, text)
    },
    {
        title: t('common.updateTime'),
        dataIndex: 'last_updated_at',
        sorter: true,
        width: 200,
        ellipsis: true
    },
    {
        title: t('common.action'),
        dataIndex: 'enable_upgrade',

        width: 150,
        slots: {
            customRender: "enable_upgrade",
        },
        slotsType: 'component',
        slotsFunc: ({ enable_upgrade, host_id }, callback) => createVNode(upgradeButton, { enable_upgrade, callback, id: host_id, type: 'agent' })
    }
]
