/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-09-30 18:50:19
 */
import pthPro from './detail_pth/index.vue'
import { TableColumn } from '@/types/tableColumn'
const useFormItems = (t: any): TableColumn[] => [
    {
        title: t('strategy.domainName'),
        dataIndex: 'name',
        formProps: {
            type: "input",
            rules: [
                { required: true, trigger: 'blur', message: t('strategy.pIptDnameL') }
            ],
            placeholder: t('strategy.pIptDnameL')
        }

    },
    {
        title: t('common.description'),
        dataIndex: 'desc',
        formProps: {
            type: "textarea",
        }

    }
]
export { useFormItems, pthPro }