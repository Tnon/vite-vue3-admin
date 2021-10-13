<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2021-09-16 09:35:54
-->
<template>
  <template v-if="!menuInfo.meta.hidden && showMenu">
    <a-menu-item :key="menuInfo.name">
      <span>{{ t(menuInfo.meta.title) }}</span>
    </a-menu-item>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Menu } from 'ant-design-vue'
import store from '@/store'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'menu-item',
  components: {
    'a-sub-menu': Menu.SubMenu,
    'a-menu-item': Menu.Item
  },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { t } = useI18n()
    const u_type = computed(() => store.state.user.user_info.u_type as number)
    //审计管理员
    const showMenu = ref<boolean>(true)
    if (u_type.value === 2) {
      showMenu.value = ['log', 'report'].includes(props.menuInfo.name as string)
    }
    return {
      showMenu,
      t
    }
  }
})
</script>

<style scoped></style>
