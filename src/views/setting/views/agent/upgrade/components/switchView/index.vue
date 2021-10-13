<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-12 19:55:00
 * @LastEditTime: 2021-07-13 09:47:14
-->
<template>
  <div class="switV">
    <!-- agent/驱动切换 start -->
    <switch-tab :types="types" v-model:actived="activedType" />
    <!-- agent/驱动切换 end -->

    <!-- 显示隐藏统计 start -->
    <ExceptionOutlined
      class="swicon"
      @click="visiable"
      v-if="actived === 'agent'"
    />
    <!-- 显示隐藏统计 start -->
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, unref } from 'vue'
import { ExceptionOutlined } from '@ant-design/icons-vue'
import { switchTab } from '@/components/switchTab'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    ExceptionOutlined,
    switchTab
  },
  props: {
    actived: String,
    showDetail: Boolean
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const types: Items[] = [
      {
        title: t('setting.agtMan'),
        type: 'agent'
      },
      {
        title: t('setting.linDada'),
        type: 'driver'
      }
    ]
    const activedType = computed({
      get: () => props.actived,
      set: (val) => emit('update:actived', val)
    })
    const visiable = (): void => {
      emit('update:showDetail', !unref(props.showDetail))
    }
    return {
      types,
      visiable,
      activedType
    }
  }
})
</script>
<style lang="less" scoped>
.switV {
  height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .node {
    display: inline-block;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    border-radius: 7px;
    cursor: pointer;
  }
  .actived {
    background: #e6e6e6;
    font-weight: 600;
    color: #000000;
  }
  .swicon {
    padding: 8px;
    cursor: pointer;
  }
}
</style>
