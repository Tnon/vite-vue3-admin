<template>
  <a-form ref="schemaFormRef" class="customForm" v-bind="formItemLayout">
    <template
      v-for="item in colsMap.filter((ele) => ele.formProps)"
      :key="item.dataIndex"
    >
      <div class="subTitle" v-if="item.dataIndex === 'slots'">
        {{ item.formProps.subTitle }}
      </div>
      <a-form-item
        v-else
        :label="item.title"
        v-bind="{ ...validateInfos[item.dataIndex] }"
      >
        <component
          @btnEvent="btnEvent"
          :disabled="disabled"
          v-model:value="fields[item.dataIndex]"
          :form-item="item.formProps"
          :dataIndex="item.dataIndex"
          v-on="{ ...getTriggerEvent(item.dataIndex, item.formProps) }"
          :is="getComponent(item.formProps.type)"
          :disKeys="disKeys"
        >
          <slot :validate="validate"></slot>
        </component>
      </a-form-item>
    </template>
  </a-form>
</template>
<script lang="ts">
import { Form } from 'ant-design-vue'
import { defineComponent, reactive, PropType, isReactive } from 'vue'
import components from './components'
import { isString, isFunction } from '@/utils/is'
import { TableColumn } from '@/types/tableColumn'
interface Props {
  colsMap: TableColumn[]
  fields: object
  formItemLayout: object
  disKeys: object
  disabled: boolean
}
const useForm = Form.useForm
export default defineComponent({
  components: {
    ...components,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item
  },
  props: {
    colsMap: {
      type: Array as PropType<TableColumn[]>
    },
    fields: {
      type: Object,
      default: () => ({})
    },
    disKeys: {
      type: Object,
      default: () => ({})
    },
    formItemLayout: {
      type: Object,
      default: () => ({
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      })
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props: Props, { emit }) {
    //表单验证规则
    const rulesRef = reactive(
      props.colsMap
        .filter((ele) => ele.formProps)
        .reduce((pre, cur) => {
          pre[cur.dataIndex] = cur.formProps!.rules || []
          return pre
        }, {})
    )
    //特殊事件
    const btnEvent = () => {
      emit('btnEvent')
    }

    //给filed主动赋键
    props.colsMap.forEach((ele) => {
      if (ele.dataIndex !== 'slots') {
        props.fields[ele.dataIndex] = props.fields[ele.dataIndex] ?? undefined
      }
    })

    const { resetFields, validate, validateInfos, validateField } = useForm(
      props.fields,
      rulesRef
    )
    // 设置触发表单项验证的事件
    const setTriggerEvent =
      ({ field, trigger }) =>
      () =>
        validate(field, { trigger }).catch(() => ({}))

    // 获取触发表单项验证的时机
    const getTriggerEvent = (field, formItem) => {
      const events = {}
      if (Array.isArray(formItem.rules)) {
        // 如果是数组
        formItem.rules.forEach((ruleItem) => {
          if (Array.isArray(ruleItem.trigger)) {
            ruleItem.trigger.forEach(
              (triggerItem) =>
                (events[triggerItem] = setTriggerEvent({
                  field,
                  trigger: triggerItem
                }))
            )
          } else if (isString(ruleItem.trigger)) {
            events[ruleItem.trigger] = setTriggerEvent({
              field,
              trigger: ruleItem.trigger
            })
          }
        })
      }
      if (isFunction(formItem.validPwd)) {
        // events['click'] = formItem.validPwd
      }
      return events
    }

    const preset = [
      'input',
      'select',
      'radio',
      'checkbox',
      'textarea',
      'password'
    ]
    // 获取组件名称
    const getComponent = (type) => {
      // 预设组件
      if (preset.includes(type)) {
        // type = type === 'password' ? 'input' : type
        return 'hooks-form-' + type
      }
      return type
    }
    return {
      validateInfos,
      validateField,
      getComponent,
      // modalValue,
      getTriggerEvent,
      validate,
      resetFields,
      btnEvent
    }
  }
})
</script>
<style lang="less" scoped>
.subTitle {
  font-size: 20px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 20px;
}
.customForm {
  ::v-deep(.ant-input) {
    border-radius: 8px;
  }
}
</style>
