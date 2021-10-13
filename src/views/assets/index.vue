<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-07 19:52:38
 * @LastEditTime: 2021-10-13 16:34:02
-->
<template>
  <a-layout>
    <a-layout-header :trigger="null">
      <!--顶部菜单栏 start-->
      <top-menu :menus="routes" mode="horizontal" class="assTopMenu" />
      <!--侧边菜单栏 end-->
    </a-layout-header>
    <!--      内容区域start-->
    <a-layout-content class="layout-content">
      <router-view v-slot="{ Component }">
        <!-- <transition name="zoom-fade" mode="out-in" appear> -->
        <component :is="Component" />
        <!-- </transition> -->
      </router-view>
    </a-layout-content>
    <!--      内容区域end-->
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Layout } from 'ant-design-vue'
import TopMenu from '@/setLayout/menu.vue'
import routes from '@/router/modules/assets/index'
export default defineComponent({
  name: 'Layout',
  components: {
    TopMenu,
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
    [Layout.Header.name]: Layout.Header
  },
  setup() {
    return { routes }
  }
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100vh;
  .ant-layout {
    min-width: 1080px;
    background: #f8f8f8;
  }
  .layout-sider80 {
    width: 112px !important;
    flex: 0 0 112px !important;
    max-width: 112px !important;
    min-width: 112px !important;
    background: #fff;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
    z-index: 10;
  }
  .layout-content {
    flex: auto;
    overflow: hidden;
    background: #f8f8f8;
  }
}
.assTopMenu {
  height: 48px !important;
  display: flex;
  align-items: center;
  padding: 0 6px;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.06);
  border: none;
  z-index: 9;
  position: relative;
  ::v-deep(.ant-menu-item) {
    padding: 6px 15px !important;
    margin: 0 2px !important;
    border-radius: 7px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    line-height: 20px;
    &::after {
      display: none;
    }
    &:hover {
      background: #eee;
    }
  }

  ::v-deep(.ant-menu-item-selected) {
    background: #eeeeee;
    font-size: 14px;
    font-weight: 600;
    color: #000000;
  }
}
</style>
