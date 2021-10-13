<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-11 10:14:44
 * @LastEditTime: 2021-09-30 16:20:10
-->
<template>
  <div class="batchBar">
    <span class="title">
      <slot name="title" />
    </span>
    <span class="btns">
      <a-button type="link" @click="cancle"> {{ t('common.cancle') }}</a-button>
      <slot name="button" />
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    isCheck: Boolean
  },
  emits: ['update:isCheck'],
  setup(props, { emit }) {
    const { t } = useI18n()
    const cancle = () => {
      emit('update:isCheck', false)
    }
    return {
      cancle,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.batchBar {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background: rgba(24, 186, 121, 0.1);
  margin-right: 16px;
}
</style>
