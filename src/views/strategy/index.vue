<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2021-08-10 14:07:04
-->
<template>
  <transition name="zoom-fade" mode="out-in" appear>
    <a-layout class="layout">
      <a-layout-Sider :trigger="null" class="slider">
        <!--      侧边菜单栏start-->
        <aside-menu :menus="menus" mode="inline" />
        <!--      侧边菜单栏end-->
      </a-layout-Sider>
      <!-- 内容区域 start -->
      <a-layout-content class="layout-content">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </a-layout-content>
      <!-- 内容区域 end -->
    </a-layout>
  </transition>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Layout } from 'ant-design-vue'
import AsideMenu from '@/setLayout/menu.vue'
import menus from '@/router/modules/strategy/index'
export default defineComponent({
  name: 'strategyIndex',
  components: {
    AsideMenu,
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
    [Layout.Sider.name]: Layout.Sider
  },
  setup() {
    return {
      menus
    }
  }
})
</script>
<style lang="less" scoped>
.layout {
  display: flex;
  height: 100vh;
  .slider {
    background: #fff;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    padding: 16px 8px;
    flex: 0 0 200px !important;
    max-width: 200px !important;
    min-width: 200px !important;
    width: 200px !important;
    ::v-deep(.ant-menu-item-selected) {
      border-radius: 8px;
    }
  }
  .layout-content {
    padding: 0px 24px;
    flex: 1;
    overflow: hidden;
    background: #f8f8f8;
  }
}
</style>
