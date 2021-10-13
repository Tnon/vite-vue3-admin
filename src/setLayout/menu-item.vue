<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-24 17:38:19
 * @LastEditTime: 2021-09-26 19:24:29
-->
<template>
  <template v-if="!menuInfo.meta.hidden">
    <a-sub-menu
      v-if="menuInfo.children?.length && !menuInfo.meta.showOnly"
      :key="menuInfo.name"
      v-bind="$attrs"
    >
      <template #title>
        <custom-icon
          v-if="menuInfo.meta.icon"
          :type="menuInfo.meta.icon"
          size="14"
          class="titleIcon"
        />
        <span>{{ t(menuInfo.meta.title) }}</span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.name">
        <template v-if="!item.children">
          <template v-if="!item.meta.hidden">
            <a-menu-item :key="item.name">
              <span>{{ t(item.meta.title) }}</span>
            </a-menu-item>
          </template>
        </template>
        <template v-else>
          <menu-item :key="item.name" :menu-info="item" />
        </template>
      </template>
    </a-sub-menu>
    <a-menu-item v-else :key="menuInfo.name">
      <span>{{ t(menuInfo.meta.title) }}</span>
    </a-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Menu } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'MenuItem',
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
  setup() {
    const { t } = useI18n()
    return {
      t
    }
  }
})
</script>

<style lang="less" scoped>
.titleIcon {
  margin-right: 4px;
}
</style>
