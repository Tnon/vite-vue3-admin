<template>
  <div class="inputBtn">
    <a-input
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
import { Input } from 'ant-design-vue'
import { FormItem } from '@/types/schema'
export default defineComponent({
  name: 'formInput',
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
    [Input.name]: Input
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
