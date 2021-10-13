<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-12 14:27:51
 * @LastEditTime: 2021-08-12 14:38:04
-->
<template>
  <div>
    <!-- 选择目标 start -->
    <a-radio-group v-model:value="moveId">
      <a-radio :value="0">{{ t('asset.Ungrouped') }}</a-radio>
      <!-- <a-radio :value="-1">上一级分组</a-radio> -->
      <a-radio :value="1">{{ t('asset.Custom') }}</a-radio>
    </a-radio-group>
    <!-- 选择目标 start -->
    <!-- 自定义 start -->
    <select-tree-vnode
      ref="selectTree"
      :target_group_idState="target_group_idState"
      :id="id"
      class="sleTree"
      v-if="moveId === 1"
    />
    <!-- 自定义 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Radio } from 'ant-design-vue'
import selectTreeVnode from '@/components/selectTreeVnode'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    target_group_idState: Object,
    id: Number
  },
  components: {
    selectTreeVnode,
    [Radio.Group.name]: Radio.Group,
    [Radio.name]: Radio
  },
  setup() {
    const { t } = useI18n()
    const selectTree = ref<any>()
    const moveId = ref<number | undefined>(0)
    return {
      moveId,
      selectTree,
      t
    }
  }
})
</script>
.
<style lang="less" scoped>
.sleTree {
  margin-top: 20px;
}
</style>
