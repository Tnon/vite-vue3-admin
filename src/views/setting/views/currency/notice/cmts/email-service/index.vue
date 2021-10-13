<template>
  <div class="bk_br_sd">
    <div class="header">{{ t('setting.sendEmailSer') }}</div>
    <div class="content">
      <a-radio-group v-model:value="value">
        <a-radio :value="1" class="noacl crad">
          {{ t('setting.smtpSer') }}
        </a-radio>
      </a-radio-group>
      <div class="emCon">
        <span class="label">
          <span>{{ t('setting.emailAdd') }}</span>
          <span class="unsetStatus" v-show="!email">
            {{ t('setting.pSetEm') }}
          </span>
          <span v-show="email">{{ email }}</span>
        </span>
        <a-button type="primary" class="btn" @click="setEmail">
          {{ t('setting.set') }}
        </a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { createVNode, defineComponent, reactive, ref, watch } from 'vue'
import { useModal } from '@/hooks'
import { useColsMap } from './index'
import slotsForm from '@/components/slots-form'
import {
  updateEmailConfigApi,
  getEmailConfigApi,
  getEmailTestApi
} from '@/api/setting/currency'
import { compileStr } from '@/utils/urlUtils'
import { Button, message } from 'ant-design-vue'
import { cloneDeep } from 'lodash'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    //邮箱验证
    const emailValid = ref<boolean>(false)
    //smtp radio
    const value = ref<number>(1)
    //邮箱
    const email = ref<string>('')
    //表单字段
    const fields = reactive<any>({ mail_encryption: 'ssl', mail_port: '465' })
    const contentProps = reactive({
      fields: { mail_encryption: 'ssl', mail_port: '465' }
    })
    // 获取发送邮件配置
    const getEmailConfig = async () => {
      const { smtp } = await getEmailConfigApi()
      //表单默认ssl
      if (!smtp.mail_encryption) {
        smtp.mail_encryption = 'ssl'
        smtp.mail_port = '465'
      }
      Object.assign(fields, smtp)
      email.value = smtp.mail_username
      contentProps.fields = cloneDeep(fields)
    }
    getEmailConfig()
    watch(
      () => contentProps.fields.mail_encryption,
      (v) => {
        if (v === 'ssl') {
          contentProps.fields.mail_port = '465'
        } else if (v === 'none') {
          contentProps.fields.mail_port = '25'
        } else {
          contentProps.fields.mail_port = '587'
        }
      }
    )
    //设置发送邮件配置
    const setEmail = () => {
      contentProps.fields = cloneDeep(fields)
      useModal(
        {
          title: t('setting.smtpSeting'),
          handleOk: async (modelRef) => {
            await modelRef.validate()
            //邮箱验证
            const res = await emailTest()
            if (res.code) {
              return Promise.reject('')
            }
            // 修改发送邮件配置
            const smtp = Object.assign({}, modelRef.fields)
            smtp.mail_password = compileStr(smtp.mail_password)
            const { code } = await updateEmailConfigApi({
              smtp
            })
            if (!code) {
              getEmailConfig()
            }
          },
          contentProps: { colsMap: useColsMap(t) }
        },
        createVNode(slotsForm, contentProps, {
          default: (slotProps) => [
            createVNode(
              Button,
              {
                loading: emailValid.value,
                type: 'primary',
                onClick: async () => {
                  try {
                    await slotProps.validate()
                  } catch {
                    return
                  }
                  emailTest(true)
                },
                style: {
                  marginLeft: '8px'
                }
              },
              {
                //邮箱验证
                default: () => t('setting.verfEmail')
              }
            )
          ]
        })
      )
    }

    // 邮箱验证
    const emailTest = async (bool?: boolean): Promise<any> => {
      if (bool) {
        emailValid.value = true
      }
      // 修改发送邮件配置
      const smtp: any = cloneDeep(contentProps.fields)
      smtp.mail_password = compileStr(smtp.mail_password)
      const res = await getEmailTestApi({
        smtp
      })
      if (res && !res.code && bool) {
        message.success(t('setting.verfEmSuc'))
      }
      emailValid.value = false
      return res
    }
    return {
      value,
      email,
      setEmail,
      fields,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  line-height: 48px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
}
.content {
  padding: 24px 48px;
  .emCon {
    background: #fafafa;
    margin-top: 12px;
    padding: 12px 24px;
    border-radius: 8px;
    margin-left: 18px;
    width: 480px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn {
      align-self: flex-end;
    }
    .label {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }
    .unsetStatus {
      color: #f8a04c;
    }
  }
}
</style>
