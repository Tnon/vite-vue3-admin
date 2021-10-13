<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-10-09 15:37:27
-->
<template>
  <a-layout class="layout" v-if="toogleFlag">
    <a-layout-sider class="layout-sider80" :trigger="null">
      <!--      网站logo start-->
      <logo />
      <!--      网站logo end-->
      <!--      侧边菜单栏start-->
      <aside-menu class="asidemenu" />
      <!--      侧边菜单栏end-->
      <!--      设置/头像start-->
      <setting-avatar />
      <!--      设置/头像end-->
    </a-layout-sider>
    <!--      内容区域start-->
    <a-layout-content class="layout-content">
      <div class="tabsview">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </a-layout-content>
    <!--      内容区域end-->
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, provide, nextTick } from 'vue'
import { Layout } from 'ant-design-vue'
import Logo from './logo/index.vue'
import AsideMenu from './menu/menu.vue'
import SettingAvatar from './setava/index.vue'
export default defineComponent({
  name: 'Layout',
  components: {
    AsideMenu,
    Logo,
    SettingAvatar,
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
    [Layout.Sider.name]: Layout.Sider
  },
  setup() {
    const toogleFlag = ref<boolean>(true)
    const reload = async () => {
      toogleFlag.value = false
      await nextTick()
      toogleFlag.value = true
    }
    provide('reload', reload)
    return {
      toogleFlag
    }
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
    overflow: auto;
    background: #f8f8f8;
    .tabsview {
      min-width: 1300px;
      overflow: hidden;
    }
  }
}
</style>
