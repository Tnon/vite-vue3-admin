/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-08-18 10:08:51
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
export const columns: TableColumn[] = [
  {
    title: '风险模块',
    dataIndex: 'dtypepath',
  },
  {
    title: '操作系统',
    dataIndex: 'osver',
    customRender: ({ text }) => createVNode('span', { style: { display: 'flex', alignItems: 'center' }, }, [createVNode(customIcon, { type: text === '0' ? '#ax-os-Linux' : '#ax-os-win', size: 24 }), text === '0' ? 'Linux' : 'Windows'])
  },
  {
    title: '攻击特征',
    dataIndex: 'description'
  },
  {
    title: '发现时间',
    dataIndex: 'event_at'
  },
  {
    title: '添加时间',
    dataIndex: 'create_at'
  },
  {
    title: '操作',
    dataIndex: 'action',
    slots: {
      customRender: 'action_icon'
    },
    actions: [
      {
        type: 'icon',
        actionList: [
          {
            type: 'popconfirm',
            text: '删除',
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