<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-12 17:42:18
-->
<template>
  <div>
    <div class="msg">{{ t('asset.pwdDelVali') }}</div>
    <a-input
      type="password"
      v-model:value.trim="pwdValue"
      :placeholder="t('asset.pIptPwdAd')"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const pwdValue = ref<string>('')
    return {
      pwdValue,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.msg {
  margin-bottom: 16px;
}
</style>
