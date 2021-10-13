/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-20 11:51:24
 * @LastEditTime: 2021-09-01 15:32:29
 */
import { TableColumn } from "@/types/tableColumn";
import { createVNode } from "vue";
import customIcon from '@/components/custom-icon'
export const useColumns = (t): TableColumn[] => [
    {
        title: t('setting.sptSys'),
        dataIndex: 'osver',
        customRender: ({ text }) => createVNode('span', {}, [createVNode(customIcon, { size: 18, type: text === '1' ? '#ax-os-win' : '#ax-os-Linux' }), text === '1' ? 'Windows' : 'Linux'])
    },
    {
        title: t('common.agentVersion'),
        dataIndex: 'version',
    },
    {
        title: t('setting.fileSize'),
        dataIndex: 'filesize',
    },
    {
        title: t('log.actTime'),
        dataIndex: 'updated_at',
    },
    {
        title: t('common.action'),
        dataIndex: 'op',
    }
]