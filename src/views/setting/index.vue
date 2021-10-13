<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-16 15:15:00
 * @LastEditTime: 2021-07-19 14:22:05
-->
<template>
  <transition name="zoom-fade" mode="out-in" appear>
    <a-layout class="layout">
      <a-layout-sider :trigger="null" class="slider">
        <!--      侧边菜单栏start-->
        <aside-menu :menus="menus" v-model:openKeys="openKeys" mode="inline" />
        <!--      侧边菜单栏end-->
      </a-layout-sider>
      <!--      内容区域start-->
      <a-layout-content class="layout-content">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </a-layout-content>

      <!--      内容区域end-->
    </a-layout>
  </transition>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import { Layout } from 'ant-design-vue'
import AsideMenu from '@/setLayout/menu.vue'
import menus from '@/router/modules/settings'
export default defineComponent({
  name: 'Layout',
  components: {
    AsideMenu,
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
    [Layout.Sider.name]: Layout.Sider
  },
  setup() {
    const state = reactive({
      openKeys: ['setting-currency', 'setting-agent', 'setting-server']
    })
    return { menus, ...toRefs(state) }
  }
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100vh;
  padding: 16px 24px;
  .slider {
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    overflow: hidden;
    padding: 8px 0px 8px 16px;
    flex: 0 0 240px !important;
    max-width: 240px !important;
    min-width: 240px !important;
    width: 240px !important;
    ::v-deep(.ant-menu-item) {
      height: 40px;
      line-height: 40px;
      padding: 0 16px !important;
      margin: 0 !important;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      border-radius: 8px;

      &:hover {
        color: #18ba79;
      }
    }

    ::v-deep(.ant-menu-submenu-inline) {
      margin-bottom: 8px;
    }

    ::v-deep(.ant-menu-sub.ant-menu-inline) {
      padding-right: 16px;
    }
  }
  .ant-layout {
    min-width: 1080px;
    background: #f8f8f8;
  }
  .layout-content {
    flex: auto;
    overflow: hidden;
    background: #f8f8f8;
  }
}
</style>
