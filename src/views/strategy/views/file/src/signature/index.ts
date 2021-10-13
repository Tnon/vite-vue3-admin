/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2021-10-12 19:08:32
 */
import { TableColumn } from '@/types/tableColumn'
import memberLog from './index.vue'
import { validatePolicyName, validateCertificate } from '@/utils/reg'
import { useModal } from '@/hooks'
import { reactive } from 'vue'
import { addSign, delSignList } from '@/api/strategy/file'
import slotsForm from '@/components/slots-form'
export const useColumns = (t): TableColumn[] => [
  {
    title: t('asset.digiSign'),
    dataIndex: 'signature',
    formProps: {
      type: 'input',
      rules: [
        { required: true, trigger: 'blur', message: t('strategy.piptCsdig'), validator: validatePolicyName },
      ],
    }
  },
  {
    title: t('strategy.cerfing'),
    dataIndex: 'certificate',
    formProps: {
      type: 'input',
      rules: [
        { trigger: 'change', message: t('strategy.pipccerft'), validator: validateCertificate },
      ],
    }
  },

  {
    title: t('common.updateDate'),
    dataIndex: 'updated_at'
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
              for (let k in record) {
                if (record[k] === '-') {
                  record[k] = ''
                }
              }
              useModal({
                title: t('strategy.editFilist'),
                contentProps: {
                  colsMap: useColumns(t),
                  fields: reactive(Object.assign({}, { signature: record.signature, certificate: record.certificate }))
                },
                handleOk: async (contentRef) => {
                  try {
                    await contentRef.validate()
                  } catch {
                    return Promise.reject('')
                  }
                  await addSign(
                    Object.assign({}, contentRef.fields, {
                      type: record.bwtype,
                      methods: 'update',
                      id: record.id
                    })
                  )
                  callback()
                }
              }, slotsForm)
            }
          },
          {
            type: 'popconfirm',
            text: t('common.delete'),
            func: async ({ record }, callback) => {
              await delSignList({ ids: [record.id] })
              callback()
            }
          },
        ]
      },

    ]
  },
]

export { memberLog }
