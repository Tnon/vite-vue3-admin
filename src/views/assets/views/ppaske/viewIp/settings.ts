/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-08 11:00:58
 * @LastEditTime: 2021-09-30 15:13:54
 */
import api from '@/api/asset'
import { createVNode } from 'vue'
import hostIp from '@/components/host-ip'
import { ASSETSNUMBER } from '@/enums/assetsType'
import treeGroup from '@/components/treeGroupNp'
export const useOptions = (state: any, type: string, t: any) => {
    state.columns = [
        {
            title: t('common.hostIp'),
            dataIndex: 'ip',
            width: 220,
            customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
        },
        {
            title: t('common.group'),
            dataIndex: 'group_kv_array',
            width: 320,
            customRender: ({ record }) => createVNode(treeGroup, { group_kv_path: record.group_kv_array })
        },
        {
            title: t('asset.' + ASSETSNUMBER[`${type}_number`]),
            dataIndex: 'count',
            width: 120,
            slots: {
                customRender: 'count'
            }
        },
    ]
    state.api = api['api_' + type]['getHostView']
}
