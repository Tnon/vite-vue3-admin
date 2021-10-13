<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-10-12 15:59:24
-->
<template>
  <div class="allRate">
    <div class="rate" v-for="(value, key) in types" :key="key">
      <div class="node">
        <p>{{ value.rate }}</p>
        <h3>{{ rates[value.ratePercent] }}</h3>
      </div>
      <div class="node">
        <p>{{ value.size }}</p>
        <h3 v-if="key !== 'cpu'">{{ rates[value.num] }}</h3>
        <h3 v-else>{{ rates[value.num] }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { allRate } from './type'
export default defineComponent({
  components: {},
  props: {
    rates: {
      type: Object
    }
  },
  setup() {
    const { t } = useI18n()
    const types: allRate = {
      cpu: {
        rate: t('asset.cpuUtil'),
        ratePercent: 'cpu_util',
        size: t('asset.cpuCoNum'),
        num: 'cpu_cores'
      },
      memory: {
        rate: t('asset.memUtil'),
        ratePercent: 'mem_util',
        size: t('setting.memSize'),
        num: 'mem_size'
      },
      disk: {
        rate: t('setting.hadUtil'),
        ratePercent: 'disk_util',
        size: t('setting.hadSize'),
        num: 'disk_size'
      }
    }
    return {
      types
    }
  }
})
</script>

<style lang="less" scoped>
.allRate {
  margin: 0 24px;
  display: flex;
  justify-content: space-between;
  .rate {
    flex: 1;
    &:nth-child(2) {
      margin: 0 16px;
    }
  }
}
.rate {
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  .node {
    flex: 1;
    p {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 5px;
    }
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .rateR {
    flex: 8;
  }
}
</style>
