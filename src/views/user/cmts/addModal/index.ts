/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-16 10:05:53
 * @LastEditTime: 2021-10-08 16:59:49
 */
import { reactive, ref } from 'vue'
import addModal from './index.vue'
import { TableColumn } from '@/types/tableColumn'
import { checkStrong } from '@/utils/tools'
import { validateEmail, validateTel, validatePhone } from '@/utils/reg'
//表单数据
const state = reactive<{
    formData: any,
}>({
    formData: {},
})
export const pwdLevelMode = reactive({
    low: false,
    middle: false,
    high: false,
    level: 0
})
export const initPwdValidate = () => {
    pwdLevelMode.low = false
    pwdLevelMode.middle = false
    pwdLevelMode.high = false
    pwdLevelMode.level = 0
}
const validatePWD = (_, value) => {
    const results = checkStrong(value ?? '', state.formData.email || '')
    Object.assign(pwdLevelMode, results)
    if (pwdLevelMode.level === 3) {
        return Promise.resolve()
    } else {
        return Promise.reject()
    }
}
const validatePWDCheck = (a, value, c, d) => {
    if (value !== state.formData.password) {
        return Promise.reject()
    }
    return Promise.resolve()
}
const useFormItems = (t): TableColumn[] => [
    {
        title: t('user.loginEmail'),
        dataIndex: 'email',
        formProps: {
            type: 'input',
            placeholder: t('user.pIptAcc'),
            rules: [
                { required: true, trigger: 'blur', message: t('user.pIptAcc'), validator: validateEmail },
            ],
        }
    },
    {
        title: t('user.name'),
        dataIndex: 'name',
        formProps: {
            type: 'input',
            placeholder: t('user.pIptName'),
            rules: [
                {
                    required: true,
                    message: t('user.pIptName'),
                }
            ],

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
            rules: [
                { trigger: 'blur', message: t('user.pIptMnum'), validator: validateTel },
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
                { required: true, trigger: 'change', message: t('user.pIptRole'), },
            ],
        }
    },
    {
        title: t('common.password'),
        dataIndex: 'password',
        formProps: {
            type: 'password',
            placeholder: t('common.pIptPwd'),
            mode: pwdLevelMode,
            rules: [
                { required: true, trigger: 'change', message: t('common.pIptPwd'), validator: validatePWD }
            ],
        },

    },
    {
        title: t('common.pwdCirm'),
        dataIndex: 'password_p',
        formProps: {
            type: 'password',
            placeholder: t('common.iptPwdAg'),
            rules: [
                { required: true, trigger: 'change', message: t('common.pwdFail'), validator: validatePWDCheck }
            ],
        }
    },
]
export { addModal, useFormItems, state }