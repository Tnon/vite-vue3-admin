<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-11 14:53:24
-->
<template>
  <div class="bk_br_sd box">
    <swt-card
      v-bind="options"
      v-model:isOpen="isOpenPwd"
      @confirm="confirm"
      @switchChange="switchChange"
    >
      <a-input-password
        type="password"
        v-model:value.trim="agentPwd"
        class="slots"
      />
    </swt-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { swtCard } from '@/views/setting/components/swt-card'
import {
  updateAgentUniApi,
  getAgentUninstallApi,
  controlAgentUniApi
} from '@/api/setting/agent'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    swtCard
  },
  setup() {
    const { t } = useI18n()
    //卸载密码
    const agentPwd = ref<string>('')
    //选项
    const options = {
      title: 'setting.agtUniTit',
      subtitle: t('setting.regChPwd'),
      label: t('setting.uniPwdSet')
    }
    //是否开启
    const isOpenPwd = ref<boolean>(false)

    // 保存agent卸载密码设置
    const confirm = async () => {
      if (unref(agentPwd)) {
        await updateAgentUniApi({
          agtuauth: unref(isOpenPwd) ? 1 : 0,
          authcode: unref(agentPwd)
        })
      } else {
        message.error(t('setting.setUinPwd'))
      }
    }

    // 获取agent卸载密码
    const getAgentUninstall = async () => {
      const { authcode, agtuauth } = await getAgentUninstallApi()
      agentPwd.value = authcode
      isOpenPwd.value = !!agtuauth
    }
    getAgentUninstall()

    // 控制设置密码开关
    const switchChange = async () => {
      await controlAgentUniApi({
        agtuauth: unref(isOpenPwd) ? 1 : 0,
        authcode: unref(agentPwd)
      })
      unref(isOpenPwd)
        ? message.success(t('setting.enaSuc'))
        : message.success(t('setting.delSuc'))
    }
    return {
      isOpenPwd,
      options,
      confirm,
      agentPwd,
      switchChange
    }
  }
})
</script>
<style lang="less" scoped>
.box {
  margin-left: 16px;
}
.slots {
  border-radius: 8px;
  margin-left: 8px;
}
</style>
