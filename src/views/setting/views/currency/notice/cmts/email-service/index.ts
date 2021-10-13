import emailService from './index.vue'
import { FormItem } from '@/types/schema.d'
import { ValidatePort, validateEmail, validateEmailServer } from '@/utils/reg'
interface FItems<T> {
    formProps: T
    title: string,
    dataIndex: string,
}
export { emailService }
export const useColsMap = (t: any): FItems<FormItem>[] => [
    {
        title: t('setting.mailSer'),
        dataIndex: 'mail_host',
        formProps: {
            type: 'input',
            placeholder: 'smtp.exmail.qq.com',
            rules: [
                { required: true, message: t('setting.mailPlac'), validator: validateEmailServer },
            ],
        }
    },
    {
        title: t('setting.comPro'),
        dataIndex: 'mail_encryption',
        formProps: {
            type: 'select',
            placeholder: t('setting.proPlac'),
            rules: [
                {
                    required: true,
                    message: t('setting.proPlac'),
                }
            ],
            options: [
                {
                    label: 'SSL',
                    value: 'ssl'
                },
                {
                    label: 'None',
                    value: 'none'
                },
                {
                    label: 'StarTLS',
                    value: 'startls'
                }
            ]
        }
    },
    {
        title: t('setting.port'),
        dataIndex: 'mail_port',
        formProps: {
            type: 'input',
            placeholder: t('setting.portPlac'),
            rules: [
                {
                    required: true,
                    trigger: 'blur',
                    message: t('setting.portPlac'),
                    validator: ValidatePort
                }
            ],
        }
    },
    {
        title: t('setting.emailAddF'),
        dataIndex: 'mail_username',
        formProps: {
            type: 'input',
            placeholder: 'xxxxxxxx@qq.com',
            rules: [
                {
                    required: true,
                    message: t('setting.emailPlac'),
                    validator: validateEmail
                }
            ],

        }
    },
    {
        title: t('setting.emPwd'),
        dataIndex: 'mail_password',
        formProps: {
            type: 'password',
            placeholder: '*****',
            extraSlot: true,
            // validPwd: (email) => {

            // },
            rules: [
                {
                    trigger: 'blur',
                    required: true,
                    message: t('setting.pwdPlac'),
                }
            ],

        }
    },
    {
        title: t('setting.sendEName'),
        dataIndex: 'mail_from_name',
        formProps: {
            placeholder: t('setting.namePlac'),
            type: 'input',
        }
    },
]