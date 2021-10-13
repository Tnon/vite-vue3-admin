<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-03 12:06:11
 * @LastEditTime: 2021-08-10 17:00:20
-->
<template>
  <div v-if="dataSource">
    <template v-for="(item, key) in dataSource.dstinfo" :key="key">
      <div class="formIt">
        <div class="label">{{ t(`arcomn.${DRAWMSG[key]}Draw`) }}</div>
        <div class="value">{{ item }}</div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { DRAWMSG } from '@/enums/attack_risk'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    dataSource: Object
  },
  setup() {
    const { t } = useI18n()
    return {
      DRAWMSG,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.formIt {
  margin: 16px 0;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-start;
  .label {
    min-width: 138px;
  }
  .value {
    word-break: break-all;
  }
}
</style>
