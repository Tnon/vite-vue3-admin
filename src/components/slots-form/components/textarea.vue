<template>
  <a-textarea
    :disabled="disKeys[dataIndex] || disabled"
    :placeholder="formItem.placeholder"
    v-model:value="modelValue"
  />
</template>
<script lang="ts">
import { defineComponent, PropType, computed, onMounted } from 'vue'
import { Input } from 'ant-design-vue'
import { FormItem } from '@/types/schema'
export default defineComponent({
  name: 'formTextarea',
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
    [Input.TextArea.name]: Input.TextArea
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
