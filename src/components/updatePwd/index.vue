<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-30 10:06:32
 * @LastEditTime: 2021-10-08 17:21:40
-->
<template>
  <slots-from ref="slotsForm" :colsMap="formItems" :fields="fields" />
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import SlotsFrom from '@/components/slots-form'
import { checkStrong } from '@/utils/tools'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    SlotsFrom
  },
  setup() {
    const { t } = useI18n()
    const slotsForm = ref<any>('')
    const fields = reactive({
      oldPassword: '',
      newPassword: '',
      newPassword_p: ''
    })
    const pwdLevelMode = reactive({
      low: false,
      middle: false,
      high: false,
      level: 0
    })
    const validatePWD = (_, value) => {
      const results = checkStrong(value ?? '', '')
      Object.assign(pwdLevelMode, results)
      if (pwdLevelMode.level === 3) {
        return Promise.resolve()
      } else {
        return Promise.reject()
      }
    }
    const validatePWDCheck = (_, value) => {
      if (value !== fields.newPassword) {
        return Promise.reject()
      }
      return Promise.resolve()
    }
    const formItems = [
      {
        title: t('user.pwdValid'),
        dataIndex: 'oldPassword',
        formProps: {
          type: 'password',
          placeholder: t('user.pwdValid'),
          rules: [
            {
              required: true,
              trigger: 'change',
              message: t('user.pwdVlidForm')
            }
          ]
        }
      },
      {
        title: t('user.newPwd'),
        dataIndex: 'newPassword',
        formProps: {
          type: 'password',
          placeholder: t('user.newPwd'),
          mode: pwdLevelMode,
          rules: [
            {
              required: true,
              trigger: 'change',
              message: t('common.pIptPwd'),
              validator: validatePWD
            }
          ]
        }
      },
      {
        title: t('user.cfmNpwd'),
        dataIndex: 'newPassword_p',
        formProps: {
          type: 'password',
          placeholder: t('user.cfmNpwdPla'),
          rules: [
            {
              required: true,
              trigger: 'change',
              message: t('common.pwdFail'),
              validator: validatePWDCheck
            }
          ]
        }
      }
    ]

    return {
      formItems,
      fields,
      slotsForm
    }
  }
})
</script>
