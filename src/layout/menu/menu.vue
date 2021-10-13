<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-09 16:07:37
-->
<template>
  <a-menu
    v-model:selected-keys="selectedKeys"
    mode="inline"
    theme="light"
    @click="clickMenuItem"
  >
    <template v-for="item in menus" :key="item.name">
      <menu-item :menu-info="item" />
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, toRefs } from 'vue'
import { Menu } from 'ant-design-vue'
import MenuItem from './menu-item.vue'
import { useRoute, useRouter } from 'vue-router'
import { routes } from '@/router'
export default defineComponent({
  name: 'Menu',
  components: {
    MenuItem,
    'a-sub-menu': Menu.SubMenu,
    'a-menu-item': Menu.Item
  },
  setup() {
    // 当前路由
    const currentRoute = useRoute()
    const router = useRouter()
    const state = reactive({
      selectedKeys: [(currentRoute.name as string).split('-')[0]]
    })
    const menus = computed(
      () => routes.find((item) => item.name == 'Layout')!.children
    )
    console.log(menus.value)
    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        if (currentRoute.name == 'login') return
        state.selectedKeys = [(currentRoute.name as string).split('-')[0]]
      }
    )
    // 点击菜单
    const clickMenuItem = ({ key }) => {
      router.push({ name: key })
    }
    return {
      ...toRefs(state),
      menus,
      clickMenuItem
    }
  }
})
</script>
