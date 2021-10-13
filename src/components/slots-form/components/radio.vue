<template>
  <a-radio-group
    :disabled="disKeys[dataIndex] || disabled"
    v-model:value="modelValue"
  >
    <template v-for="item in formItem.options" :key="item.label">
      <a-radio :value="item.value">{{ item.label }}</a-radio>
    </template>
  </a-radio-group>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, onMounted } from 'vue'
import { Radio } from 'ant-design-vue'
import { FormItem } from '@/types/schema'
export default defineComponent({
  name: 'formRadio',
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
  components: {
    [Radio.name]: Radio,
    [Radio.Group.name]: Radio.Group
  },
  setup(props, { emit }) {
    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val)
    })
    onMounted(() => {})
    return {
      modelValue
    }
  }
})
</script>
