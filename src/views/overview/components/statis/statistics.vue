<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-09-18 15:16:06
-->
<template>
  <div class="content" @click="openDetails">
    <span class="border"></span>
    <span class="title">{{ t('overview.statistics') }}</span>
    <DownOutlined :class="!fold ? 'isFold' : ''" class="arrow" />
    <div v-if="!fold" class="details">
      <staticDetail />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import staticDetail from './cmts/details.vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: { DownOutlined, staticDetail },
  props: {
    fold: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  emits: ['update:fold'],
  setup(props, { emit }) {
    const { t } = useI18n()
    const openDetails = () => {
      emit('update:fold', !props.fold)
    }
    return {
      openDetails,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.content {
  min-width: 130px;
  height: 40px;
  background: #fff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  position: relative;
  .border {
    display: inline-block;
    width: 4px;
    height: 16px;
    background: #f05064;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
  }
  .title {
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    margin: 0 8px;
  }
  .arrow {
    font-size: 12px;
    color: #666;
    transition: all 0.2s;
  }
  .isFold {
    transform: rotateZ(180deg);
  }
  .details {
    width: 100%;
    background: #fff;
    position: absolute;
    z-index: 1;
    top: 41px;
    left: 0;
    overflow: auto;
    box-shadow: 0px 10px 16px 0px rgba(0, 0, 0, 0.08);
    // border: 1px solid red;
    border-radius: 0 0 8px 8px;
  }
}
</style>
