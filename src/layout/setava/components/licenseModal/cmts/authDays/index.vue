<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2021-10-12 11:47:39
-->
<template>
  <div class="fitem">
    <span class="label">{{ t('license.authPerd') }}</span>
    <span
      class="ecolor"
      v-if="isString(daysSurplus) && daysSurplus.indexOf('authExp') > -1"
    >
      {{ daysSurplus }}
    </span>
    <span v-else>
      <!-- {{ t('license.' + authDays) }} -->
      {{
        isString(authDays)
          ? t('license.' + authDays)
          : authDays + t('license.days')
      }}
      <span class="ecolor" v-if="!isString(authDays)">
        {{ daysSurplus }}
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import store from '@/store'
import { isString } from '@/utils/is'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const authDays = computed(() => store.getters['license/authDays'])
    const daysSurplus = computed(() => store.getters['license/daysSurplus'])
    return {
      authDays,
      daysSurplus,
      isString,
      t
    }
  }
})
</script>
