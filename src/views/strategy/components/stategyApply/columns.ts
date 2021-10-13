/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-29 18:59:52
 * @LastEditTime: 2021-10-12 18:59:49
 */
import { TableColumn } from "@/types/tableColumn";
import { createVNode } from "vue";

export const useColumns = (t): TableColumn[] => [
    {
        title: t('common.group'),
        dataIndex: 'name',
        ellipsis: true,
        width: '400px'
    },
    {
        title: t('strategy.hostNum'),
        dataIndex: 'host_count',
    },
    {
        title: t('strategy.selectPly'),
        dataIndex: '',
        slots: {
            customRender: 'stategySelect'
        },
        width: 200
    },
    {
        title: t('strategy.Inherit'),
        dataIndex: 'inherit',
        customRender: ({ text }) => createVNode('span', {}, text ? t('strategy.inherit') : '-'),
    },
]