/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2021-09-30 19:41:37
 */
import { useModal } from '@/hooks'
import { TableColumn } from '@/types/tableColumn'
import memberLog from './index.vue'
import addStrategyForm from './form/index.vue'
import { addMd5Sha1, delMd5Sha1 } from '@/api/strategy/file'
import { reactive, createVNode } from 'vue'
import customIcon from '@/components/custom-icon'
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('strategy.attriskName'),
    dataIndex: 'name',
  },
  {
    title: t('common.system'),
    dataIndex: 'osver',
    customRender: ({ text }) => createVNode('span', { style: { display: 'flex', alignItems: 'center' }, }, [createVNode(customIcon, { type: text === '0' ? '#ax-os-Linux' : '#ax-os-win', size: 24 }), text === '0' ? 'Linux' : 'Windows'])
  },
  {
    title: 'MD5',
    dataIndex: 'md5'
  },
  {
    title: 'SHA1',
    dataIndex: 'sha1'
  },
  {
    title: t('common.updateDate'),
    dataIndex: 'updated_at'
  },
  {
    title: t('common.remarks'),
    dataIndex: 'remark'
  },
  {
    title: t('common.action'),
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
            func: ({ record }, callback) => {
              const mdOrShatype: any = []
              if (record.md5 && record.md5 !== '-') {
                mdOrShatype.push('md5')
              }
              if (record.sha1 && record.sha1 !== '-') {
                mdOrShatype.push('sha1')
              }
              for (let k in record) {
                if (record[k] === '-') {
                  record[k] = ''
                }
              }
              useModal({
                title: t('common.edit'),
                contentProps: reactive({
                  fields: Object.assign({}, record, { mdOrShatype })
                }),
                handleOk: async (contentRef) => {
                  try {
                    await contentRef.validate()
                  } catch {
                    return Promise.reject('')
                  }
                  await addMd5Sha1(
                    Object.assign({}, contentRef.fields, {
                      type: record.bwtype,
                      methods: 'update',
                      id: record.id
                    })
                  )
                  callback()
                }
              }, addStrategyForm)
            }
          },
          {
            type: 'popconfirm',
            text: t('common.delete'),
            func: async ({ record }, callback) => {
              await delMd5Sha1({ ids: [record.id] })
              callback()
            }
          },
        ]
      },

    ]
  },
]
export { memberLog }
