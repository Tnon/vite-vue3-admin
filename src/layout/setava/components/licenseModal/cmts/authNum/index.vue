<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-12 11:31:42
-->
<template>
  <div class="fitem">
    <span class="label">{{ t('license.authTers') }}</span>
    <span>
      <span>{{ authNum }}{{ t('setting.agtUil') }}</span>
      <span class="ecolor">{{ t('license.remSet', [numbSurplus]) }}</span>
    </span>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import store from '@/store'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const authNum = computed(() => store.getters['license/authNum'])
const numbSurplus = computed(() => store.getters['license/numbSurplus'])
</script>
