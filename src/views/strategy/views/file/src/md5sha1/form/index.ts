import { validatePolicyName, validateNone } from '@/utils/reg'
import { reactive } from 'vue'
export interface modalValue {
  name: string
  osver: string
  remarks: string
  md5: string
  sha1: string
  mdOrShatype: string[]
}
export const useRules = (t: any) => reactive({
  name: [
    {
      required: true,
      message: t('strategy.atrNamePlac'),
      trigger: 'blur',
      validator: validatePolicyName
    }
  ],
  osver: [
    {
      required: true,
      message: t('strategy.systemPlac'),
      trigger: 'change'
    }
  ],
  mdOrShatype: [
    {
      type: 'array',
      required: true,
      message: t('strategy.addTypePlac'),
      trigger: 'change',
    },
  ],
  md5: [
    {
      message: t('strategy.iptCmd5'),
      trigger: 'change',
      validator: validateNone
    }
  ],
  sha1: [
    {
      message: t('strategy.iptSha'),
      trigger: 'change',
      validator: validateNone
    }
  ]
})