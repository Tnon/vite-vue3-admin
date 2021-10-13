<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-12 11:25:57
-->
<template>
  <div class="fitem">
    <span class="label">{{ t('license.authStatus') }}</span>
    <div
      class="licen"
      :class="[authStatus.flag === 'Authorized' ? 'suc' : 'err']"
    >
      <custom-icon
        :type="
          authStatus.flag === 'Authorized'
            ? '#ax-authorize'
            : '#ax-unauthorized'
        "
        size="18"
      />
      <span class="sket">{{ t('license.' + authStatus.status) }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import store from '@/store'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const authStatus = computed(() => store.getters['license/authStatus'])
</script>
