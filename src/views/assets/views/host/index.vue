<template>
  <a-layout class="layout-ass">
    <a-layout-sider
      :trigger="null"
      :class="collapsed ? 'cassetsTree' : 'assetsTree'"
      v-model:collapsed="collapsed"
      collapsible
    >
      <!--      侧边菜单栏start-->
      <assets-tree
        class="treeCon"
        v-model:group_id="group_id"
        v-model:expId="expId"
        @refreshTable="refreshTable"
        v-model:gTitle="gTitle"
      />

      <!--      侧边菜单栏end-->
    </a-layout-sider>
    <!--      内容区域start-->
    <a-layout-content class="layout-content">
      <assets-table v-model:group_id="group_id" ref="assetsTable">
        <!-- 折叠标题  start -->
        <div @click="collapsed = !collapsed" style="cursor: pointer">
          <MenuUnfoldOutlined class="colIcon" v-show="collapsed" />
          <MenuFoldOutlined class="colIcon" v-show="!collapsed" />
          <span class="title">{{ gTitle }}</span>
        </div>
        <!-- 折叠标题  end -->
      </assets-table>
    </a-layout-content>
    <!--      内容区域end-->
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, provide, ref } from 'vue'
import { Layout } from 'ant-design-vue'
import AssetsTree from './cmts/treeMenu'
import AssetsTable from './cmts/tableContent'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
    [Layout.Sider.name]: Layout.Sider,
    AssetsTree,
    AssetsTable,
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },
  setup() {
    const { t } = useI18n()
    //content元素
    const assetsTable = ref<any>(null)

    //选中的组，展开的组，是否折叠，显示的标题
    const state = reactive<{
      group_id: number
      expId: number[]
      collapsed: boolean
      gTitle: string
    }>({
      group_id: -1,
      expId: [],
      collapsed: false,
      gTitle: t('common.allHost')
    })

    //表格组件逆向传值到父
    const openTree = (key, title, expArr) => {
      state.group_id = key
      state.gTitle = title
      state.expId = expArr
    }
    //向孙子（表格）注入一个选中树节点的方法
    provide('openTree', openTree)

    //对树操作后刷新表格
    const refreshTable = () => {
      assetsTable.value.refreshTable()
    }
    return {
      ...toRefs(state),
      assetsTable,
      refreshTable
    }
  }
})
</script>
<style lang="less" scoped>
.layout-ass {
  display: flex;
  height: calc(100vh - 48px);
}
.assetsTree {
  overflow: hidden;
  width: 280px !important;
  flex: 0 0 280px !important;
  max-width: 280px !important;
  min-width: 280px !important;
  background: #fff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
  z-index: 7;

  .treeCon {
    padding: 16px 0px;
    overflow: auto;
    height: calc(100vh - 50px);
    position: relative;
  }
}
.cassetsTree {
  overflow: hidden;
  width: 0px !important;
  flex: 0 0 0px !important;
  max-width: 0px !important;
  min-width: 0px !important;
  opacity: 0;
}
.colIcon {
  font-size: 14px;
  color: #666;
  margin-right: 9px;
}
.title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
}
.layout-content {
  flex: 1;
}
</style>
