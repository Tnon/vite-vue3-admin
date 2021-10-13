import { TableColumn } from "@/types/tableColumn"
import { useModal } from '@/hooks'
import { createVNode } from "vue"
import { bakStatus } from '@/views/setting/views/agent/components'
import { downLoadBak, deleteBak } from '@/api/setting/server'
import store from '@/store'
import { Button, message } from "ant-design-vue"
import { Logout } from '@/utils/tools'
import { backFileExist, recoverDb } from '@/api/setting/server'
export const useColumns = (t: any): TableColumn[] => [
  {
    title: t('setting.bakTime'),
    dataIndex: 'created_at'
  },
  {
    title: t('setting.bakType'),
    dataIndex: 'type',
    customRender: ({ text }) => text === 1 ? t('setting.manBak') : t('setting.iptBaKC')
  },
  {
    title: t('setting.fileSize'),
    dataIndex: 'filesize'
  },
  {
    title: t('setting.bakStatus'),
    dataIndex: 'status',
    customRender: ({ text: status }) => createVNode(bakStatus, { status })

  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    slots: {
      customRender: 'action_icon'
    },
    actions: [
      {
        //导入中 和 备份中  不能操作按钮
        disabled: (record) => record.status === 1 || record.status === 4,
        type: 'icon',
        actionList: [
          {
            text: t('setting.restNow'),
            func: ({ record }) => {
              //备份成功和导入成功 能恢复
              if (record.status === 2 || record.status === 5) {
                useModal({
                  title: t('setting.restTit'),
                  maskClosable: false,
                  handleOk: async () => {
                    //验证是否存在
                    const { code } = await backFileExist({ id: record.id, type: 'recover' })
                    if (!code) {
                      //恢复备份
                      const { code: resCode } = await recoverDb({ id: record.id })
                      if (!resCode) {
                        confirmLogout(t)
                      }
                    }
                    return Promise.reject('')
                  }
                },
                  createVNode('span', {}, t('setting.restTips'))
                )
              } else {
                message.error(t('setting.cantRest'))
              }

            }
          },
          {
            text: t('common.download'),
            func: async ({ record }) => {
              if (record.status === 2 || record.status === 5) {
                await downLoadBak({ id: record.id, type: 'download' })
                let a = document.createElement("a");
                a.href = '/api/admin/download_backup?id=' + record.id + '&token=' +
                  store.state.user.token
                document.body.appendChild(a);
                a.click(); //下载
                URL.revokeObjectURL(a.href); // 释放URL 对象 
                document.body.removeChild(a);
              } else {
                message.error(t('setting.cantDown'))
              }

            }
          },
          {
            type: 'popconfirm',
            text: t('common.delete'),
            func: async ({ record }, reload) => {
              if (record.status === 1 || record.status === 4) {
                message.error(t('setting.waitCom'))
              } else {
                await deleteBak({ id: record.id })
                reload()
              }

            }
          }
        ]
      },

    ]
  }
]

const confirmLogout = (t) => {
  useModal({
    title: t('setting.seeRut'),
    maskClosable: false,
    footer: false,
    width: 350
  },
    createVNode('div', { style: { textAlign: 'right', padding: '20px 0' } }, [
      createVNode(Button, { type: 'primary', onClick: () => Logout() }, {
        default: () => t('common.confirm'),
      })
    ])
  )
}