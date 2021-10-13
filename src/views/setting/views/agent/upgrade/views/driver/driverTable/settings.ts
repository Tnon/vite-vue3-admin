/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-09 12:09:00
 */
import { TableColumn } from "@/types/tableColumn";
import { createVNode, reactive } from 'vue'
import hostIp from '@/components/host-ip'
import { getAdapted_os_list, getNo_Adapted_os_list, getNo_Adapted_host_list } from '@/api/setting/agent'
import { upgradeStatus } from '../../../components/upgradeStatus'
import { useModal } from "@/hooks";
import { SlotsTable } from "@/components/slots-table";
import hostOnline from '@/components/host-online'
import treeGroup from '@/components/treeGroupNp'
import { upgradeButton } from '@/views/setting/views/agent/upgrade/components'
import customIcon from '@/components/custom-icon'
import { osLogoType } from '@/utils/tools'
interface option {
    columns: TableColumn[],
    api(...rest): Promise<any>
}
type fTypes = 'adapted' | 'unAdapted'
type dataType = Record<fTypes, option>
const getUnadColumns = (os: string, t: any): TableColumn[] => [
    {
        title: t('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        sorter: true,
        customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os, online: record.online })
    },
    {
        title: t('common.onlineStau'),
        width: 120,
        dataIndex: 'online',
        customRender: ({ text: online }) => createVNode(hostOnline, { online })
    },
    {
        title: t('common.group'),
        width: 200,
        dataIndex: 'group_kv_path',
        customRender: ({ text: group_kv_path }) => createVNode(treeGroup, { group_kv_path })
    },
    {
        title: t('common.agentVersion'),
        width: 200,
        dataIndex: 'agent_version',
    },
]

export const useTableData = (t: any): dataType => {
    return {
        adapted: {
            api: getAdapted_os_list,
            columns: [
                {
                    title: t('setting.sysMsg'),
                    dataIndex: 'os',
                    sorter: true,
                    customRender: ({ text }) => {
                        const type = osLogoType(text, true)
                        return createVNode('div', {
                            style: {
                                display: 'flex',
                                alignItems: 'center'
                            }
                        }, [createVNode(customIcon, { type, size: 24 }), text])
                    }
                },
                {
                    title: t('setting.adaDriVer'),
                    dataIndex: 'driver_version',
                    sorter: true,
                },
                {
                    title: t('setting.terNum'),
                    dataIndex: 'host_count',
                    sorter: true,
                },
                {
                    title: t('setting.upStuTerNum'),
                    dataIndex: 'status_text',
                    customRender: ({ record, text }) => createVNode(upgradeStatus, { status: record.status, status_count: record.status_count, status_text: text, os: record.os || record.osver, record }),
                    sorter: true,
                },
                {
                    title: t('common.action'),
                    dataIndex: 'enable_upgrade',
                    slots: {
                        customRender: "enable_upgrade",
                    },
                    slotsType: 'component',
                    // slotsFunc: ({ enable_upgrade, os }, callback) => createVNode(upgradeButton, { enable_upgrade, callback, id: os, type: 'driver' })
                    slotsFunc: (record, callback) => createVNode(upgradeButton, { enable_upgrade: record.enable_upgrade, callback, id: record.os, type: 'driver', record })
                }
            ]
        },
        unAdapted: {
            api: getNo_Adapted_os_list,
            columns: [
                {
                    title: t('setting.sysMsg'),
                    dataIndex: 'os',
                    sorter: true,
                    customRender: ({ text }) => {
                        const type = osLogoType(text, true)
                        return createVNode('div', {
                            style: {
                                display: 'flex',
                                alignItems: 'center'
                            }
                        }, [createVNode(customIcon, { type, size: 24 }), text])
                    }
                },
                {
                    title: t('setting.terNum'),
                    dataIndex: 'host_count',
                    sorter: true,
                    customRender: ({ record, text }) => {
                        return createVNode('span', {
                            style: {
                                cursor: 'pointer'
                            },
                            onClick: () => useModal({
                                title: record.os,
                                width: 1080,
                                contentProps: {
                                    columns: getUnadColumns(record.os, t),
                                    class: 'tabled',
                                    rowKey: 'host_id',
                                    arguments: reactive({ ip: '', os: record.os || record.osver }),
                                    getListFunc: getNo_Adapted_host_list
                                },
                            }, SlotsTable)
                        }, text)
                    }
                }
            ]
        }
    }
}


export interface StaType {
    agms: {
        os: string,
        // osver: string | undefined,
        driver_version: string | undefined,
    }
    columns: TableColumn[]
    api(...rest): Promise<any>

}