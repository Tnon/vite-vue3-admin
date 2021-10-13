<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-05 15:21:08
 * @LastEditTime: 2021-08-08 16:17:42
-->
<template>
  <div class="footer">
    <switch-nodes
      v-model:actived="fType"
      :types="
        dtype === 87
          ? typesRiskNotimeline
          : modelType === 1
          ? typesAttack
          : typesRisk
      "
    />
    <component
      class="comclas"
      @changePage="changePage"
      :is="fType"
      :dataSource="dataSource"
    />
  </div>
</template>
<script lang="ts">
import switchNodes from '@/components/switchNodes'
import { defineComponent, ref } from 'vue'
import { dstInfo, srcInfo, timeLine } from './cmts'
import { getTabs } from './index'
export default defineComponent({
  props: {
    modelType: Number,
    dtype: {
      type: Number,
      required: true
    },
    dataSource: {
      type: Object,
      required: true
    }
  },
  components: {
    switchNodes,
    dstInfo,
    srcInfo,
    timeLine
  },
  setup(_, { emit }) {
    const fType = ref<string>('srcInfo')
    const changePage = (page) => {
      emit('changePage', page)
    }
    const { typesAttack, typesRisk, typesRiskNotimeline } = getTabs()
    return {
      fType,
      typesAttack,
      typesRisk,
      typesRiskNotimeline,
      changePage
    }
  }
})
</script>
<style lang="less" scoped>
.footer {
  padding: 24px 0;
}
</style>
