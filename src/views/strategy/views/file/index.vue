<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-30 09:35:17
 * @LastEditTime: 2021-10-12 17:05:03
-->
<template>
  <div>
    <div class="header">
      <switch-nodes v-model:actived="fType" size="small" :types="types" />
    </div>
    <div>
      <switch-nodes v-model:actived="tType" :types="cmytypes" />
      <transition name="zoom-fade" mode="out-in" appear>
        <component :is="dync_cmt" :listType="fType" />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  shallowRef,
  ref,
  watchEffect,
  unref,
  watch
} from 'vue'
import switchNodes from '@/components/switchNodes'
import { getHostList } from '@/api/asset/host'
import { types, cmytypes, cmt_sign, cmt_md5 } from './index'
import { initRowSelection } from '@/components/slots-table/hooks'
export default defineComponent({
  components: {
    switchNodes
  },
  setup() {
    //黑白名单
    const fType = ref<number>(1)
    //md5 Or sign
    const tType = ref<string>('cmt_md5')
    const cmts = {
      cmt_md5,
      cmt_sign
    }
    //动态组件
    const dync_cmt = shallowRef<any>('')
    //赋值
    watchEffect(() => {
      dync_cmt.value = cmts[unref(tType)]
    })
    //黑白切换
    watch(fType, () => {
      initRowSelection()
    })
    return {
      fType,
      getHostList,
      types,
      tType,
      cmytypes,
      dync_cmt
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  height: 56px;
  .title {
    font-weight: 700;
    font-size: 16px;
  }
  .line {
    display: inline-block;
    width: 1px;
    height: 16px;
    background: #eee;
    margin: 0 16px;
  }
}
.tab {
  padding: 16px;
}
.table {
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
}
</style>
