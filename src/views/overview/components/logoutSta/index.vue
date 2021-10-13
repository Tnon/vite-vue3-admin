<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-22 14:57:40
-->
<template>
  <div>
    <!-- 账户登出期间 start -->
    <span>{{ t('overview.duringlogout') }}</span>
    <span class="attack com" :class="~~attacknum ? 'hasAttack' : ''">
      <!-- 【攻击：{{ attacknum }}】 -->
      {{ t('overview.attackNumber', [attacknum]) }}
    </span>
    <span class="risk com" :class="~~risknum ? 'hasRisk' : ''">
      <!-- 【风险：{{ risknum }}】 -->
      {{ t('overview.riskNumber', [risknum]) }}
    </span>
    <!-- 账户登出期间 end -->
    <span class="line">|</span>
    <!-- 账户登出范围 start -->
    <span v-if="last_logout_at">
      {{ t('overview.lastlogout') }}
      {{ last_logout_at }} - {{ last_login_at || '-' }}
    </span>
    <!-- 账户登出范围 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { logoutData } from './types'
import { getNologinDura } from '@/api/overview'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const state = reactive<logoutData>({
      attacknum: 0,
      last_login_at: '',
      last_logout_at: '',
      risknum: 0
    })
    getNologinDura().then((res) => {
      Object.assign(state, res)
    })
    return {
      ...toRefs(state),
      t
    }
  }
})
</script>
<style lang="less" scoped>
.com {
  font-size: 13px;
  font-weight: 600;
  color: #18ba79;
}
.attack {
  margin: 0 8px;
}
.line {
  margin: 0 16px;
  color: #eee;
}
.hasAttack {
  color: #f05064;
}
.hasRisk {
  color: #f8a454;
}
</style>
