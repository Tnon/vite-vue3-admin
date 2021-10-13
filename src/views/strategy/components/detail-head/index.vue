<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-30 16:53:51
-->
<template>
  <div class="header bk_br_sd">
    <span class="title" @click="goBack($attrs.path)">
      <LeftOutlined />
      <slot></slot>
    </span>
    <div>
      <a-button class="btn" type="link" @click="goBack($attrs.path)">
        {{ t('common.cancle') }}
      </a-button>
      <slot name="confirm" :goBack="goBack"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    api: Function as PropType<() => Promise<any>>
  },
  components: {
    LeftOutlined
  },
  setup() {
    const route = useRouter()
    const { t } = useI18n()
    const goBack = (name) => {
      route.push({
        name
      })
    }
    return {
      goBack,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  position: relative;
  z-index: 11;
  height: 48px;
  line-height: 48px;
  padding: 0 16px;
  font-size: 20px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    cursor: pointer;
  }
  .btn {
    margin-left: 16px;
  }
}
</style>
