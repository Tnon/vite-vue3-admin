/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-09 12:08:02
 */
import { TableColumn } from "@/types/tableColumn";
import { createVNode } from 'vue'
import hostIp from '@/components/host-ip'
import { getAdapted_os_list, getNo_Adapted_os_list } from '@/api/setting/agent'
import { upgradeButton } from '@/views/setting/views/agent/upgrade/components'
interface option {
    columns: TableColumn[],
    api(...rest): Promise<any>
}
type fTypes = 'adapted' | 'unAdapted'
type dataType = Record<fTypes, option>
export const tableData: dataType = {
    adapted: {
        api: getAdapted_os_list,
        columns: [
            {
                title: '系统信息',
                dataIndex: 'os',
                sorter: true,
            },
            {
                title: '适配驱动版本',
                dataIndex: 'driver_version',
                sorter: true,
            },
            {
                title: '终端数量',
                dataIndex: 'host_count',
                sorter: true,
            },
            {
                title: '升级状态(终端数)',
                dataIndex: 'status_text',
                customRender: ({ record, text }) => createVNode('span', {}, text + '(' + record.status_count + ')'),
                sorter: true,
            },
            {
                title: '操作',
                dataIndex: 'action',
                slots: {
                    customRender: "enable_upgrade",
                },
                slotsType: 'component',
                slotsFunc: ({ enable_upgrade, os }, callback) => createVNode(upgradeButton, { enable_upgrade, callback, id: os, type: 'driver' })
            }
        ]
    },
    unAdapted: {
        api: getNo_Adapted_os_list,
        columns: [
            {
                title: '系统信息',
                dataIndex: 'os',
                sorter: true,
                customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
            },
            {
                title: '终端数量',
                dataIndex: 'terminalNum',
                sorter: true,
                slots: {
                    customRender: 'terminalNum'
                }
            }
        ]
    }
}

export interface StaType {
    agms: {
        os: string,
        osver: string | undefined,
        driver_version: string | undefined,
    }
    columns: TableColumn[]
    api(...rest): Promise<any>

}