/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2021-09-30 16:32:42
 */
import { TableColumn } from "@/types/tableColumn";
import { createVNode } from 'vue'
import { subGroup } from '../../components'
import router from '@/router'
import { delSercuity } from '@/api/strategy/security'
export const useColumns = (t): TableColumn[] => [
  {
    title: t('strategy.sercurityName'),
    dataIndex: 'name',
    width: 200
  },
  {
    title: t('strategy.distNum'),
    dataIndex: 'total',
    width: 100
  },
  {
    title: t('strategy.ineffeQu'),
    dataIndex: 'uneffected',
    width: 100,
    customRender: ({ text }) => createVNode('span', { style: { color: text ? '#f8a04c' : 'rgba(0, 0, 0, 0.85)' } }, text)
  },
  {
    title: t('strategy.polAppGroup'),
    dataIndex: 'policyrecord',
    slots: {
      customRender: 'policyrecord'
    },
    width: 400,
    slotsType: 'component',
    slotsFunc: (record, reload) => createVNode(subGroup, { name: record.name, desc: record.desc, policyrecord: record.policyrecord, policy_type: 0, reload })
  },
  {
    title: t('strategy.lastDate'),
    dataIndex: 'updated_at',
    width: 220,
  },
  {
    title: t('common.action'),
    width: 100,
    dataIndex: 'action',
    slots: {
      customRender: 'action_icon'
    },
    actions: [
      {
        type: 'icon',
        actionList: [
          {
            text: t('common.edit'),
            func: ({ record }) => {
              router.push({
                name: 'strategy-security-detail',
                query: { strategy_id: record.id }
              })
            }
          },
          {
            type: 'popconfirm',
            text: t('common.delete'),
            disabled: (record) => record.id === 1,
            // disabled: (record) => record.id === 1 && record.name === '全局默认策略',
            func: async ({ record }, callback) => {
              await delSercuity({
                id_string: record.id + ''
              })
              callback()
            }
          },
        ]
      },

    ]
  }
]