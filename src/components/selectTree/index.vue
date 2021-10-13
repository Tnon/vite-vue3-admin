<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-22 18:45:05
 * @LastEditTime: 2021-09-09 20:42:58
-->
<template>
  <div style="flex: 1">
    <a-tree-select
      treeNodeFilterProp="title"
      :replaceFields="replaceFields"
      class="treeselect"
      v-model:value="modelValue"
      :tree-data="dataSource"
      allow-clear
      :multiple="multiple"
      :placeholder="placeholder || t('common.allPlace')"
      @change="changeSelect"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { TreeSelect } from 'ant-design-vue'
import { Props } from './type'
import { DownOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    dataSource: Array as PropType<any[]>,
    selectedKeys: [String, Number],
    placeholder: {
      type: String
    },
    multiple: {
      type: Boolean
    },
    replaceFields: {
      type: Object,
      default: () => ({
        children: 'items',
        title: 'name',
        key: 'id',
        value: 'id'
      })
    }
  },
  components: {
    DownOutlined,
    [TreeSelect.name]: TreeSelect
  },
  setup(props: Props, { emit }) {
    const { t } = useI18n()
    const modelValue = computed({
      get: () => {
        //多选时候 (string,string)
        if (props.multiple) {
          if (props.selectedKeys) {
            return (props.selectedKeys as string).split(',')
          } else {
            return []
          }
        } else {
          //单选时候
          if (props.selectedKeys !== undefined) {
            if (props.selectedKeys === -1) {
              return undefined
            } else {
              return props.selectedKeys
            }
          } else {
            return props.selectedKeys
          }
        }
      },
      set: (val) => {
        //多选
        if (props.multiple) {
          if (!(val as string[] | number[]).length) {
            emit('update:selectedKeys', '')
          } else {
            emit('update:selectedKeys', (val as string[] | number[]).join(','))
          }
        } else {
          //单选
          if (val === undefined) {
            emit('update:selectedKeys', -1)
          } else {
            emit('update:selectedKeys', val)
          }
        }
      }
    })
    const SHOW_PARENT = TreeSelect.SHOW_PARENT
    const changeSelect = (v, b, c) => {
      if (c.preValue.some((ele) => ele.value === String(c.triggerValue))) {
        if (v.indexOf(c.triggerValue) > -1) {
          v.splice(v.indexOf(c.triggerValue), 1)
          emit('update:selectedKeys', v.join(','))
        }
      }
    }
    return {
      SHOW_PARENT,
      modelValue,
      changeSelect,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.suffixIcon {
  position: absolute;
  top: 5px;
  right: 10px;
  color: #666;
}
</style>
