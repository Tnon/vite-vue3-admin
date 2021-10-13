<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-09 18:13:23
-->
<template>
  <!-- 资产同步周期 -->
  <div class="syncConfig">
    <span class="subTitle">{{ t('setting.assCycle') }}</span>
    <a-radio-group v-model:value="agms.assets_option" :disabled="!disabled">
      <template v-for="item in syncConfig" :key="item.value">
        <a-radio :value="item.value"> {{ t('setting.' + item.label) }}</a-radio>
      </template>
    </a-radio-group>
  </div>

  <!-- 时间选择 -->
  <slot name="timeSelect" />

  <!-- 每周 -->
  <div class="syncConfig" v-if="agms.assets_option === '1'">
    <span class="subTitle">{{ t('setting.dfWek') }}</span>
    <a-checkbox-group v-model:value="agms.weeks" :disabled="!disabled">
      <template v-for="item in weekData" :key="item.value">
        <a-checkbox :value="item.value">
          {{ t('setting.' + item.label) }}
        </a-checkbox>
      </template>
    </a-checkbox-group>
  </div>
</template>

<script lang="ts">
import { useSyncConfig, useWeekData } from '../index'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    agms: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { t } = useI18n()
    const syncConfig = useSyncConfig()
    const weekData = useWeekData()
    return {
      syncConfig,
      weekData,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.syncConfig {
  margin-bottom: 30px;
  .subTitle {
    display: inline-block;
    text-align: right;
    width: 120px;
    margin-right: 16px;
  }
}
</style>
