/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-29 10:46:23
 * @LastEditTime: 2021-09-30 16:59:21
 */
import configForm from './detail_config/index.vue'
import { TableColumn } from '@/types/tableColumn'
const useFormItems = (t: any): TableColumn[] => [
    {
        title: t('strategy.sercurityName'),
        dataIndex: 'name',
        formProps: {
            type: "input",
            rules: [
                { required: true, trigger: 'blur', message: t('strategy.piptSerName'), }
            ]
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
export { useFormItems, configForm }