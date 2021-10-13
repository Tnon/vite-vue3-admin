<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-20 09:28:43
 * @LastEditTime: 2021-10-11 14:40:03
-->
<template>
  <div>
    <div class="header">
      <span>
        <span>{{ t(title) }}</span>
        <span class="subTitle" :title="subtitle">
          {{ subtitle }}
        </span>
      </span>
      <a-switch v-model:checked="isOpenCom" @change="switchChange"></a-switch>
    </div>
    <div class="content">
      <span>{{ label }}</span>
      <span v-show="!isOpenCom" class="subTitle">
        {{ t('setting.setAOp') }}
      </span>
      <span v-show="isOpenCom">
        <slot />
      </span>
      <a-button
        v-show="isOpenCom"
        class="cfmBtn"
        @click="confirm"
        type="primary"
      >
        {{ t('common.save') }}
      </a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    title: String,
    subtitle: String,
    label: String,
    isOpen: Boolean
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const isOpenCom = computed({
      get: () => props.isOpen,
      set: (val) => emit('update:isOpen', val)
    })
    const confirm = () => {
      emit('confirm')
    }

    const switchChange = () => {
      emit('switchChange')
    }
    return {
      isOpenCom,
      confirm,
      switchChange,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  line-height: 48px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
}
.content {
  padding: 24px 48px;
  height: 80px;
  display: flex;
  align-items: center;
}
.subTitle {
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  margin-left: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 500px;
  display: inline-flex;
}

.cfmBtn {
  margin-left: 20px;
}
</style>
