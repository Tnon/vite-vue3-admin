<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-20 21:08:22
 * @LastEditTime: 2021-10-12 17:24:32
-->
<template>
  <div class="serverId">
    <div class="header">
      <span>{{ t('license.serverID') }}</span>
      <span class="copy" @click="copy">{{ t('license.copy') }}</span>
    </div>
    <div class="content">
      <span class="id">{{ serverId }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import useClipboard from 'vue-clipboard3'
import store from '@/store'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const serverId = computed(() => store.state.license.servid)
//复制
const { toClipboard } = useClipboard()
const copy = async () => {
  try {
    await toClipboard(serverId.value)
    message.success(t('setting.copClid'))
  } catch (e) {}
}
</script>
