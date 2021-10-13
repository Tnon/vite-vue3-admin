<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-04 14:19:56
 * @LastEditTime: 2021-07-04 16:08:59
-->
<template>
  <a-modal
    v-model:visible="visible"
    :afterClose="remove"
    :closable="false"
    :getContainer="container"
    :class="{ nofooter: !footer }"
    :width="width"
    :wrapClassName="wrapClassName"
    :maskClosable="maskClosable"
  >
    <template #title>
      <span>{{ title }}</span>
      <span class="subtitle" v-if="subtitle">{{ subtitle }}</span>
    </template>
    <template #footer>
      <div v-if="footer">
        <a-button key="back" @click="visible = false">
          {{ t('common.cancle') }}
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="ok">
          {{ t('common.confirm') }}
        </a-button>
      </div>
      <span v-else></span>
    </template>
    <component :is="content" v-bind="contentProps" ref="contentRef" />
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, unref } from 'vue'
import { Modal, Input, Button } from 'ant-design-vue'
import { ModalProps } from './type'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'form-modal',
  components: {
    [Modal.name]: Modal,
    [Input.name]: Input,
    [Button.name]: Button
  },
  props: {
    container: {
      type: Function,
      default: () => document.body
    },
    title: {
      type: String as PropType<string>
    },
    remove: {
      type: Function
    },
    handleOk: {
      type: Function
    },
    //内容专属 属性
    contentProps: {
      type: Object,
      default: () => ({})
    },
    content: {
      type: Object
    },
    footer: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    subtitle: {
      type: String
    },
    width: {
      type: Number,
      default: 520
    },
    wrapClassName: {
      type: String,
      default: ''
    }
  },
  setup(props: ModalProps) {
    const { t } = useI18n()
    let visible = ref<boolean>(true)
    let loading = ref<boolean>(false)
    const contentRef: any = ref<HTMLElement>()
    const ok = async () => {
      loading.value = true
      try {
        await props.handleOk(unref(contentRef))
        loading.value = false
        visible.value = false
      } catch {
        loading.value = false
      }
    }
    return {
      visible,
      contentRef,
      ok,
      loading,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.subtitle {
  font-weight: 300;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 16px;
}
</style>
