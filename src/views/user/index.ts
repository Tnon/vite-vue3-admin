/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2021-10-08 16:27:44
 */
import { TableColumn } from '@/types/tableColumn'
import { enableUser, updateUserPasswordApi, updateUserApi } from '@/api/user'
import memberLog from './index.vue'
import { useModal } from '@/hooks'
import { createVNode, reactive, unref } from 'vue'
import { userInfo } from '@/components/userInfo'
import slotsForm from '@/components/slots-form'
import { updatePwd } from '@/components/updatePwd'
import { message } from 'ant-design-vue'
import { pCompile } from '@/utils/urlUtils'
import { validatePhone } from '@/utils/reg/index'
const useEditColumns = (t: any): TableColumn[] => [
    {
        title: t('user.account'),
        dataIndex: 'email',
        formProps: {
            type: 'input',
            placeholder: t('user.pIptAcc'),
        }

    },
    {
        title: t('user.name'),
        dataIndex: 'name',
        formProps: {
            type: 'input',
            placeholder: t('user.pIptName'),
            rules: [
                { required: true, trigger: 'blur', message: t('user.pIptName'), },
            ],
        }
    },
    {
        title: t('user.dep'),
        dataIndex: 'dept',
        formProps: {
            type: 'input',
            placeholder: t('user.pIptDep'),
        }
    },
    {
        title: t('user.mobNum'),
        dataIndex: 'mobile',
        formProps: {
            type: 'input',
            placeholder: t('user.pIptPnum'),
            rules: [
                { required: true, trigger: 'blur', message: t('user.pIptPnum'), validator: validatePhone },
            ],
        }
    },
    {
        title: t('user.telNum'),
        dataIndex: 'telephone',
        formProps: {
            type: 'input',
            placeholder: t('user.pIptMnum'),
        }
    },
    {
        title: t('log.adminRole'),
        dataIndex: 'u_type',
        formProps: {
            type: 'radio',
            options: [
                {
                    label: t('user.sysAdmin'),
                    value: '1'
                },
                {
                    label: t('user.auditAdmin'),
                    value: '2'
                }
            ],
            rules: [
                { required: true, trigger: 'blur', message: t('user.pIptRole'), },
            ],
        }
    },
]
export const useColumns = (t: any): TableColumn[] => [
    {
        title: t('user.name') + '/' + t('user.account'),
        dataIndex: 'email',
        width: 280,
        customRender: ({ record }) => createVNode(userInfo, { email: record.email, avatar: record.head_image.url, name: record.name }),
    },
    {
        title: t('user.dep'),
        dataIndex: 'dept',
        width: 160,
    },
    {
        title: t('user.mobNum'),
        dataIndex: 'mobile',
        width: 160,
    },
    {
        title: t('user.telNum'),
        dataIndex: 'telephone',
        width: 160,
    },
    {
        title: t('log.adminRole'),
        dataIndex: 'u_type',
        width: 200,
        customRender: ({ text }) => text === 1 ? t('user.sysAdmin') : t('user.auditAdmin'),
    },
    {
        title: t('common.lastLogin'),
        dataIndex: 'last_login_at',
        width: 280
    },
    {
        title: t('report.creatTime'),
        dataIndex: 'created_at',
        width: 280
    },
    {
        title: t('user.enaStu'),
        dataIndex: 'enable',
        width: 120,
        slots: {
            customRender: 'action_switch',
        },
        actions: [
            {
                type: 'switch',
                func: async ({ record }, callback) => {
                    useModal({
                        title: record.enable === 'T' ? t('user.stopAdmin') : t('user.startAdmin'),
                        handleOk: async () => {
                            const { code } = await enableUser({
                                id: record.id,
                                table: "users",
                                value: record.enable === "T" ? "F" : "T"
                            })
                            if (!code) {
                                record.enable = record.enable === "T" ? "F" : "T"
                                record.enable === "T" ? message.success(t('user.startSuc')) : message.success(t('user.stopSuc'))
                                callback()
                            }

                        }
                    },
                        createVNode('span')
                    )

                }
            }
        ]
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
                        text: t('user.editMsg'),
                        func: ({ record }, callback) => {
                            useModal({
                                title: t('user.editMsg'),
                                handleOk: async (conRef) => {
                                    await conRef.validate()
                                    await updateUserApi(record.id, {
                                        data: conRef.fields
                                    })
                                    callback()
                                },
                                contentProps: {
                                    disKeys: {
                                        email: true
                                    },
                                    fields: reactive({
                                        name: record.name,
                                        email: record.email,
                                        mobile: record.mobile === '-' ? '' : record.mobile,
                                        telephone: record.telephone === '-' ? '' : record.telephone,
                                        dept: record.dept === '-' ? '' : record.dept,
                                        u_type: record.u_type + ''
                                    }),
                                    colsMap: useEditColumns(t)
                                }
                            }, slotsForm)
                        }
                    },
                    {
                        text: t('user.updatePwd'),
                        func: ({ record }) => {
                            useModal({
                                title: t('user.updatePwd'),
                                handleOk: async (conRef) => {
                                    await unref(conRef.slotsForm).validate()
                                    await updateUserPasswordApi(record.id, {
                                        chpwd: {
                                            n: pCompile(conRef.fields.newPassword),
                                            o: pCompile(conRef.fields.oldPassword),
                                        },
                                        id: record.id
                                    })
                                }
                            },
                                updatePwd
                            )
                        }
                    }
                ]
            },

        ]
    },
]


export { memberLog }
