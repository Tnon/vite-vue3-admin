<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-30 10:06:32
 * @LastEditTime: 2021-10-12 10:44:07
-->
<template>
  <div>
    <div class="header">{{ t('setting.pwdSeting') }}</div>
    <updatePwd ref="passwordForm" />
    <div style="float: right">
      <a-button type="primary" @click="commit">{{
        t('common.confirm')
      }}</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { updatePwd } from '@/components/updatePwd'
import { setUserPasswordApi } from '@/api/user'
import store from '@/store'
import { pCompile } from '@/utils/urlUtils'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    updatePwd
  },
  setup() {
    const { t } = useI18n()
    const passwordForm = ref<any>('')
    // 密码设置
    const commit = async () => {
      const { id } = store.state.user.user_info
      try {
        await unref(passwordForm).slotsForm.validate()
        const { code } = await setUserPasswordApi(id, {
          chpwd: {
            n: pCompile(unref(passwordForm).fields.newPassword),
            o: pCompile(unref(passwordForm).fields.oldPassword)
          },
          id
        })
        !code && unref(passwordForm).slotsForm.resetFields()
      } catch {
        return
      }
    }
    return {
      commit,
      passwordForm,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  height: 40px;
  line-height: 40px;
  font-weight: 800;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
  letter-spacing: 0;
  text-align: justify;
  margin-bottom: 20px;
}
</style>
