/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-12 10:41:26
 */
import { TableColumn } from '@/types/tableColumn'
import modifyModal from './index.vue'
import { validatePhone, validateTel } from '@/utils/reg/index'

interface Type {
  'dept': TableColumn[],
  'mobile': TableColumn[],
  'telephone': TableColumn[],
}
export const useFormItems = (t: any): Type => {
  return {
    'dept': [
      {
        dataIndex: 'dept',
        formProps: {
          type: 'input',
          placeholder: t('user.pIptDep'),
          rules: [
            { required: true, message: t('user.pIptDep') },
          ],
        }
      }
    ],
    'mobile': [
      {
        dataIndex: 'mobile',
        formProps: {
          type: 'input',
          placeholder: t('user.pIptPnum'),
          rules: [
            { required: true, trigger: 'blur', message: t('user.pIptPnum'), validator: validatePhone },
          ],
        }
      },
    ],
    'telephone': [
      {
        dataIndex: 'telephone',
        formProps: {
          type: 'input',
          placeholder: t('user.pIptMnum'),
          rules: [
            { required: true, trigger: 'blur', message: t('user.pIptMnum'), validator: validateTel },
          ],
        }
      }
    ]
  }
}
export default modifyModal