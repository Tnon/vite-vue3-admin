/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-10-12 18:01:33
 */
import { TableColumn } from "@/types/tableColumn";
import { createVNode } from "vue";
export const useColumns = (t): TableColumn[] => [
    {
        title: t('overview.perType'),
        dataIndex: 'day',
        customRender: ({ text }) => createVNode('span', {}, text === 1 ? t('overview.day') : text === 7 ? t('overview.week') : t('overview.month'))
    },
    {
        title: t('overview.disAtts'),
        dataIndex: 'unhandle_attacknum',
        customRender: ({ text }) => createVNode('span', { style: { color: '#F05064' } }, text)
    },
    {
        title: t('overview.handledAttack'),
        dataIndex: 'handle_attacknum',
        customRender: ({ text }) => createVNode('span', { style: { color: '#18BA79' } }, text)
    },

    {
        title: t('overview.disRisks'),
        dataIndex: 'unhandle_risknum',
        customRender: ({ text }) => createVNode('span', { style: { color: '#F8A454' } }, text)
    },
    {
        title: t('overview.handledRisk'),
        dataIndex: 'handle_risknum',
        customRender: ({ text }) => createVNode('span', { style: { color: '#18BA79' } }, text)
    },
    {
        title: t('overview.perTime'),
        dataIndex: '',
        customRender: ({ record }) => createVNode('span', {}, record.begintime + ' 至 ' + record.endtime)
    },
]