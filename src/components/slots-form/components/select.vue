<template>
  <a-select
    :placeholder="formItem.placeholder"
    v-model:value="modelValue"
    ref="select"
    :disabled="disKeys[dataIndex] || disabled"
  >
    <template v-if="formItem.options && formItem.options.length">
      <template v-for="option in formItem.options" :key="option.value">
        <Option :value="option.value">
          {{ option.label }}
        </Option>
      </template>
    </template>
    <template v-else>
      <template v-for="option in asyncOptions" :key="option.id">
        <Option :value="option.id">
          {{ option.repname }}
        </Option>
      </template>
    </template>
  </a-select>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  onMounted,
  reactive,
  ref
} from 'vue'
import { Select, Spin } from 'ant-design-vue'
import { FormItem } from '@/types/schema'
import { isFunction } from '@/utils/is'
export default defineComponent({
  name: 'formSelect',
  emits: ['update:value'],
  props: {
    formItem: {
      // 表单项
      type: Object as PropType<FormItem>,
      default: () => ({})
    },
    disKeys: Object,
    dataIndex: String,
    value: undefined as any, // 表单项值
    disabled: Boolean
  },
  components: {
    [Select.name]: Select,
    Option: Select.Option,
    [Spin.name]: Spin
  },
  setup(props, { attrs, emit }) {
    let asyncOptions = reactive([])
    const getOptions = async () => {
      if (isFunction(props.formItem.asyncOptions)) {
        const data = await props.formItem.asyncOptions()
        Object.assign(asyncOptions, data)
      }
    }

    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val)
    })
    onMounted(() => {
      getOptions()
    })
    return {
      modelValue,
      asyncOptions
    }
  }
})
</script>
