<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-06 10:53:51
 * @LastEditTime: 2021-07-30 10:00:58
-->
<template>
  <a-menu
    v-model:selected-keys="selectedKeys"
    v-model:openKeys="openKeysValue"
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

export default defineComponent({
  name: 'Menu',
  components: {
    MenuItem,
    'a-sub-menu': Menu.SubMenu,
    'a-menu-item': Menu.Item
  },
  props: {
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
      default: false
    },
    menus: {
      type: Array
    },
    openKeys: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    // 当前路由
    const currentRoute = useRoute()
    const router = useRouter()
    const state = reactive({
      selectedKeys: [
        (currentRoute.meta as any).selectedKeys ?? currentRoute.name
      ]
    })
    const openKeysValue = computed({
      get: () => props.openKeys,
      set: (val) => emit('update:openKeys', val)
    })
    // 监听菜单收缩状态
    watch(
      () => props.collapsed,
      (newVal) => {
        state.selectedKeys = [currentRoute.name]
      }
    )

    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        if (currentRoute.name == 'login' || props.collapsed) return
        state.selectedKeys = [
          (currentRoute.meta as any).selectedKeys ?? currentRoute.name
        ]
      }
    )

    // 点击菜单
    const clickMenuItem = ({ item, key, keyPath }) => {
      state.selectedKeys = [
        (currentRoute.meta as any).selectedKeys ?? currentRoute.name
      ]
      if (currentRoute.meta.keepIp) {
        const {
          query: { id }
        } = currentRoute
        router.replace({ name: key, query: { id } })
      } else {
        router.push({ name: key })
      }
    }

    return {
      ...toRefs(state),
      // menus,
      clickMenuItem,
      openKeysValue
    }
  }
})
</script>
