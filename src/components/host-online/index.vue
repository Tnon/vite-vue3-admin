<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-11 15:30:30
-->
<template>
  <div>
    <Badge
      :status="online ? 'processing' : 'default'"
      :color="online ? '#18BA79' : '#eee'"
    />
    <span class="online" v-if="online">{{ t('common.onLine') }}</span>
    <span class="offline" v-else>{{ t('common.offLine') }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { Badge } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
defineProps({
  online: Boolean
})
const { t } = useI18n()
</script>

<style lang="less" scoped>
.online {
  color: #18ba79;
}
.offline {
  color: rgba(0, 0, 0, 0.45);
}
</style>
