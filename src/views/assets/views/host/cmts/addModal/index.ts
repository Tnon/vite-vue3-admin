import addModal from './index.vue'
import { RuleObject } from 'ant-design-vue/es/form/interface';
import { TableColumn } from '@/types/tableColumn'
import { bytesLength } from '@/utils/tools'
import { useI18n } from '@/plugins/setupGlobalLocalLang';
const validateName = async (rule: RuleObject, value: string) => {
    if (bytesLength(value) > 20) {
        return Promise.reject();
    } else {
        return Promise.resolve();
    }
}
const T = useI18n()
export const useFormItems = (): TableColumn[] => [
    {
        dataIndex: 'groupName',
        formProps: {
            type: 'input',
            placeholder: T('asset.newGPlacPre') + ',' + T('asset.newGPlacNext'),
            rules: [
                { required: true, message: T('asset.newGPlacPre'), },
                { validator: validateName, trigger: 'change', message: T('asset.newGPlacNext'), }
            ],
        }
    },
]
export default addModal