<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-02 20:31:57
 * @LastEditTime: 2021-08-05 09:28:34
-->
<template>
  <slots-form
    :formItemLayout="formItemLayout"
    :colsMap="formItems"
    :fields="fields"
    ref="slotsForm"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { formItems } from './index'
import slotsForm from '@/components/slots-form'
export default defineComponent({
  components: {
    slotsForm
  },
  props: {
    fields: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const slotsForm = ref<any>()
    const formItemLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 }
    }
    return {
      formItems,
      formItemLayout,
      slotsForm
    }
  }
})
</script>
