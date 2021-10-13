/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2021-10-12 20:01:35
 */
import behaviorLog from './index.vue'
export { behaviorLog }
import { TableColumn } from '@/types/tableColumn'
import { useModal } from '@/hooks'
import { FormState } from '@/api/report/model'
import { message } from 'ant-design-vue'
import { addFormSub, delSubReport } from '@/api/report'
import subForm from './subForm/index'
import { reactive } from 'vue'
export const addOrUpdate = (t, type, fields, agms, callback, id?) => {
  useModal(
    {
      title: type ? t('report.newSub') : t('report.mdgSub'),
      contentProps: {
        fields,
        agms,
      },
      handleOk: async (modelRef) => {
        await modelRef.slotsRef.validate()
        if (!modelRef.agms.round) {
          message.error(t('report.seleSubTime'))
          return Promise.reject('')
        }
        if (!modelRef.agms[modelRef.agms.round].length) {
          message.error(t('report.seleSubTime'))
          return Promise.reject('')
        }
        if (!modelRef.agms.emails.length) {
          message.error(t('report.finSubEmail'))
          return Promise.reject('')
        }
        await addFormSub(
          Object.assign({}, modelRef.agms, modelRef.fields, { id: !type ? id : undefined }) as FormState
        )
        callback()
      }
    },
    subForm
  )
}
export const useColumns = (t): TableColumn[] => [
  {
    title: t('report.subName'),
    dataIndex: 'subname',
    sorter: true,
  },
  {
    title: t('report.admEmail'),
    dataIndex: 'username'
  },
  {
    title: t('report.creatTime'),
    dataIndex: 'created_at'
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
              addOrUpdate(t, false,
                reactive({ name: record.repname, select: record.repid, }),
                reactive({ round: record.subtype ? 'month' : 'week', week: record.subtype ? [] : record.subvalue.split(','), month: record.subtype ? record.subvalue.split(',') : [], emails: record.subemail.split(',') }),
                callback,
                record.id,
              )
            }
          },
          {
            type: 'popconfirm',
            text: t('common.delete'),
            func: async ({ record }, callback) => {
              await delSubReport({ subidarr: [record.id] })
              callback()

            }
          },

        ]
      },

    ]
  }

]
