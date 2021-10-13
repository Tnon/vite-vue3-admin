<template>
  <a-checkbox-group
    v-model:value="modelValue"
    v-bind="formItem"
    ref="checkbpx"
    :disabled="disKeys[dataIndex] || disabled"
  >
    <template v-if="formItem.options && formItem.options.length">
      <template v-for="option in formItem.options" :key="option.value">
        <a-checkbox :value="option.value">
          {{ option.label }}
        </a-checkbox>
      </template>
    </template>
  </a-checkbox-group>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Checkbox, Spin } from 'ant-design-vue'
import { FormItem } from '@/types/schema'
export default defineComponent({
  name: 'formCheckbox',
  emits: ['update:value'],
  props: {
    formItem: {
      // 表单项
      type: Object as PropType<FormItem>,
      default: () => ({})
    },
    disabled: Boolean,
    disKeys: Object,
    dataIndex: String,
    value: undefined as any // 表单项值
  },
  components: {
    [Checkbox.name]: Checkbox,
    [Checkbox.Group.name]: Checkbox.Group,
    [Spin.name]: Spin
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
