<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-16 09:51:10
 * @LastEditTime: 2021-09-02 14:22:46
-->
<template>
  <a-layout class="layout">
    <!-- 左侧筛选 start -->
    <a-layout-sider class="layout-sider80">
      <tree-slider
        ref="treeSliderRef"
        :modelType="MODELTYPE.RISK"
        v-model:handleType="handleType"
        v-model:selectedKeys="selectedKeys"
        v-model:selectedTitle="selectedTitle"
      />
    </a-layout-sider>

    <!-- 左侧筛选 end -->

    <!-- 右侧数据 start -->
    <a-layout-content>
      <data-table
        ref="dataTable"
        v-bind="state"
        :modelType="MODELTYPE.RISK"
        :reloadTree="reloadTree"
      />
    </a-layout-content>
    <!-- 右侧数据 end -->
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, unref } from 'vue'
import { Layout } from 'ant-design-vue'
import { treeSlider, dataTable } from '@/components/attack-risk-cmts'
import { MODELTYPE } from '@/enums/attack_risk'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Layout.name]: Layout,
    [Layout.Sider.name]: Layout.Sider,
    [Layout.Content.name]: Layout.Content,
    treeSlider,
    dataTable
  },
  setup() {
    const { t } = useI18n()
    // 总览跳转携带参数
    const {
      query: { handleType, path, title }
    } = useRoute()
    /*
    初始值(包括 处理类型和攻击类型)
    数据入口
    */
    const state: any = reactive<{
      handleType: number
      selectedKeys: string
      selectedTitle: string
    }>({
      handleType: ~~handleType!,
      selectedKeys: (path as string) ?? (MODELTYPE.RISKPATH as string),
      selectedTitle: (title as string) ?? t('risk.allRisk')
    })

    //树ref
    const treeSliderRef = ref<any>(null)
    //表格ref
    const dataTable = ref<any>(null)
    //刷新树的方法
    const reloadTree = () => {
      unref(treeSliderRef).getTreeData()
    }
    return {
      ...toRefs(state),
      state,
      treeSliderRef,
      dataTable,
      MODELTYPE,
      reloadTree
    }
  }
})
</script>
<style lang="less" scoped>
.layout {
  display: flex;
  height: 100vh;
}
.layout-sider80 {
  width: 280px !important;
  flex: 0 0 280px !important;
  max-width: 280px !important;
  min-width: 280px !important;
  background: #fff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);

  ::v-deep(.header) {
    margin: 16px;
  }
}
</style>
