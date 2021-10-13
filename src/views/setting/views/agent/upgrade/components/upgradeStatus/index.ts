/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-30 18:50:03
 * @LastEditTime: 2021-09-09 12:00:22
 */
import upgradeStatus from './index.vue'
import { TableColumn } from "@/types/tableColumn";
import { createVNode } from 'vue'
import hostIp from '@/components/host-ip'
import hostOnline from '@/components/host-online'
import treeGroup from '@/components/treeGroupNp'
import { upgradeButton } from '@/views/setting/views/agent/upgrade/components'
export const useColumns = (t): TableColumn[] => [
    {
        title: t('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        sorter: true,
        customRender: ({ record }) => createVNode(hostIp, { ip: record.ip, host_id: record.host_id, os: record.os || record.osver, online: record.online })
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
        dataIndex: 'current_agent_version',
    },
    {
        title: t('setting.driverVer'),
        width: 120,
        dataIndex: 'current_driver_version',
    },
    {
        title: t('setting.upgStau'),
        width: 250,
        dataIndex: 'upgrade_status_text',
        customRender: ({ record, text }) => {
            let color: any;
            switch (record.upgrade_status) {
                //最新版本
                case 0:
                    color = '#000'
                    break
                // 可升级
                case 1:
                    color = '#F8A454'
                    break
                //待升级
                case 2:
                    color = '#F8A454'
                    break
                // 升级中
                case 3:
                    color = '#18BA79'
                    break
                //升级失败
                case 4:
                    color = '#F05064'
                    break
                //agent版本不匹配
                case 5:
                    color = '#F05064'
                    break
            }
            return createVNode('span', { style: { color } }, text)
        }
    },
    {
        title: t('common.updateTime'),
        width: 200,
        dataIndex: 'last_updated_at',
    },
    {
        title: t('common.action'),
        dataIndex: 'last_offline_at',
        slots: {
            customRender: "enable_upgrade",
        },
        slotsType: 'component',
        slotsFunc: ({ enable_upgrade, host_id }, callback) => createVNode(upgradeButton, { enable_upgrade, callback, id: host_id, type: 'host' })
    },

]
export { upgradeStatus }