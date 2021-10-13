<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-12 18:30:45
-->
<template>
  <div class="item">
    <a-input
      type="password"
      v-model:value.trim="modelValue"
      v-bind="formItem"
      v-on="formItem.eventObject"
    />
    <a-button type="primary" class="btn">{{ t('setting.verfPwd') }}</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { Input, Button } from 'ant-design-vue'
import { FormItem } from '@/types/schema'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    formItem: {
      // 表单项
      type: Object as PropType<FormItem>,
      default: () => ({})
    },
    value: undefined as any // 表单项值
  },
  components: {
    [Input.name]: Input,
    [Button.name]: Button
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val)
    })
    return {
      modelValue,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.item {
  display: flex;
  .btn {
    margin-left: 16px;
  }
}
</style>
