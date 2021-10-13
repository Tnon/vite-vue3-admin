<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-12 17:18:38
-->
<template>
  <div class="inputBtn">
    <a-popover
      placement="right"
      v-if="formItem.mode"
      destroyTooltipOnHide
      trigger="focus"
    >
      <template #content>
        <pwd-level v-bind="{ ...formItem.mode }" />
      </template>
      <a-input
        :type="formItem.type"
        :placeholder="formItem.placeholder"
        v-model:value.trim="modelValue"
        :disabled="disKeys[dataIndex] || disabled"
      />
    </a-popover>
    <a-input
      v-else
      :type="formItem.type"
      :placeholder="formItem.placeholder"
      v-model:value.trim="modelValue"
      :disabled="disKeys[dataIndex] || disabled"
    />
    <slot v-if="formItem.extraSlot" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Popover } from 'ant-design-vue'
import { FormItem } from '@/types/schema'
import { pwdLevel } from '@/components/pwdLevel'
export default defineComponent({
  components: {
    [Popover.name]: Popover,
    pwdLevel
  },
  props: {
    formItem: {
      // 表单项
      type: Object as PropType<FormItem>,
      default: () => ({})
    },
    disKeys: Object,
    dataIndex: String,
    disabled: Boolean,
    value: undefined as any // 表单项值
  },
  setup(props, { emit }) {
    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val)
    })
    return {
      modelValue
    }
  }
})
</script>
<style lang="less" scoped>
.inputBtn {
  display: flex;
  .btn {
    margin-left: 20px;
  }
}
</style>
