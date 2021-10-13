/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2021-10-08 15:21:41
 */
import { TableColumn } from '@/types/tableColumn'
import memberLog from './index.vue'
import { addReportListApi, delManaReport } from '@/api/report'
import { useModal } from '@/hooks'
import slotsForm from '@/components/slots-form'
import { reactive } from 'vue'
import { toArray } from 'lodash'
import { message } from 'ant-design-vue'
import { exportExcel } from '@/utils/tools'
export const addOrUpdateReport = (t: any, type: boolean, fields, callback: Function, id?: number): void => {
  useModal({
    title: type ? t('report.newReport') : t('report.editReport'),
    width: 640,
    contentProps: {
      colsMap: useFormItems(t),
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        labelAlign: 'left'
      },
      fields,
    },
    handleOk: async (contRef) => {
      await contRef.validate()
      if (
        toArray(Object.assign({}, contRef.fields, { repname: [] })).some(
          (ele) => ele && ele.length
        )
      ) {
        //去除name
        const omitName = Object.assign({}, contRef.fields)
        delete omitName['repname']
        //接口
        await addReportListApi({
          repname: contRef.fields.repname,
          reptype: JSON.stringify(omitName),
          id: !type ? id : undefined
        })
        //刷新
        callback()
      } else {
        message.error(t('report.warnIng'))
        return Promise.reject('')
      }
    }
  },
    slotsForm
  )
}
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('report.repName'),
    dataIndex: 'repname',
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
              addOrUpdateReport(t, false, reactive(Object.assign({}, JSON.parse(record.reptype), { repname: record.repname })), callback, record.id)
            }
          },
          {
            type: 'popconfirm',
            text: t('common.delete'),
            func: async ({ record }, callback) => {
              await delManaReport({ repidarr: [record.id] })
              callback()
            }
          },
          {
            text: t('common.export'),
            func: ({ record }) => {
              exportExcel('/api/export/rep', { filter: { id: record.id } })
            }
          }
        ]
      },

    ]
  },
]

export const useFormItems = (t): TableColumn[] => [
  {
    title: t('report.repName'),
    dataIndex: 'repname',
    formProps: {
      type: 'input',
      placeholder: t('report.repNamePlac'),
      rules: [
        { required: true, trigger: 'blur', message: t('report.repNamePlac'), },
      ],
    }
  },
  {
    dataIndex: 'slots',
    formProps: {
      type: 'component',
      subTitle: t('report.seleRepType'),
    }
  },
  {
    title: t('menu.attack'),
    dataIndex: 'attack',
    formProps: {
      type: 'checkbox',
      options: [
        {
          label: t('arcomn.memAttack'),
          value: 'memory'
        },
        {
          label: t('arcomn.expAttack'),
          value: 'loophole'
        },
        {
          label: t('arcomn.codeAttack'),
          value: 'malice'
        }
      ]
    }
  },
  {
    title: t('menu.risk'),
    dataIndex: 'risk',
    formProps: {
      type: 'checkbox',
      options: [
        {
          label: t('arcomn.accountRisk'),
          value: 'account'
        },
        {
          label: t('arcomn.docRisk'),
          value: 'file'
        },
        {
          label: t('arcomn.kerRisk'),
          value: 'kernal'
        },
        {
          label: t('arcomn.proRisk'),
          value: 'process'
        },
        {
          label: t('arcomn.netRisk'),
          value: 'network'
        }
      ]
    }
  },
  {
    title: t('menu.assets'),
    dataIndex: 'asset',
    formProps: {
      type: 'checkbox',
      options: [
        {
          value: 'host',
          label: t('asset.host'),
        },
        {
          value: 'process',
          label: t('asset.process'),
        },
        {
          value: 'account',
          label: t('asset.account'),
        },
        {
          value: 'service',
          label: t('asset.service'),
        },
        {
          value: 'kernel',
          label: t('asset.kernel'),
        },
        {
          value: 'env',
          label: t('asset.env'),
        }
      ]
    }
  },
  {
    title: t('menu.user'),
    dataIndex: 'user',
    formProps: {
      type: 'checkbox',
      options: [
        {
          label: t('report.adminMag'),
          value: 'user'
        }
      ]
    }
  },
  {
    title: t('menu.log'),
    dataIndex: 'log',
    formProps: {
      type: 'checkbox',
      options: [
        {
          label: t('log.member'),
          value: 'operation'
        },
        {
          label: t('log.behavior'),
          value: 'behavior'
        }
      ]
    }
  }
]
export { memberLog }
