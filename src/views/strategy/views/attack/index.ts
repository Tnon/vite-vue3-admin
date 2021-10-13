/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-09-30 19:12:15
 */
import { TableColumn } from "@/types/tableColumn"
import { delAttackList } from '@/api/strategy/attack'
import { createVNode } from 'vue'
import customIcon from '@/components/custom-icon'
export const types: Items[] = [
  {
    title: 'common.blackList',
    type: 1
  },
  {
    title: 'common.whiteList',
    type: 0
  }
]
export const useColumns = (t): TableColumn[] => [
  {
    title: t('strategy.riskModal'),
    dataIndex: 'dtypepath',
    width: 200,
    ellipsis: true
  },
  {
    title: t('common.system'),
    dataIndex: 'osver',
    ellipsis: true,
    width: 100,
    customRender: ({ text }) => createVNode('span', { style: { display: 'flex', alignItems: 'center' }, }, [createVNode(customIcon, { type: text === '0' ? '#ax-os-Linux' : '#ax-os-win', size: 24 }), text === '0' ? 'Linux' : 'Windows'])

  },
  {
    title: t('arcomn.attChar'),
    dataIndex: 'description',
    width: 300,
    ellipsis: true
  },
  {
    title: t('arcomn.disTime'),
    dataIndex: 'event_at',
    width: 220,
    ellipsis: true
  },
  {
    title: t('strategy.addTime'),
    dataIndex: 'create_at',
    width: 220,
    ellipsis: true
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    width: 100,
    slots: {
      customRender: 'action_icon'
    },
    actions: [
      {
        type: 'icon',
        actionList: [
          {
            type: 'popconfirm',
            text: t('common.delete'),
            func: async ({ record }, callback) => {
              const { contentmd5, dtype, black, osver } = record
              await delAttackList({
                list: [{
                  contentmd5, dtype, black, osver
                }]
              })
              callback()
            }
          },
        ]
      }
    ]
  }
]