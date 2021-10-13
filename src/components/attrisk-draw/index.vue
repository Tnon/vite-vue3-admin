<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-05 15:00:47
 * @LastEditTime: 2021-09-29 19:43:46
-->
<template>
  <a-drawer
    style="filter: none"
    :title="title"
    width="640"
    v-model:visible="visible"
    :destroyOnClose="true"
    :after-visible-change="visibleChange"
  >
    <component :is="content" v-bind="contentProps" />
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Drawer } from 'ant-design-vue'
export default defineComponent({
  name: 'form-modal',
  components: {
    [Drawer.name]: Drawer
  },
  props: {
    remove: {
      type: Function
    },
    title: {
      type: String
    },
    contentProps: {
      type: Object
    },
    content: Object
  },
  setup(props) {
    let visible = ref<boolean>(true)
    const visibleChange = (v) => {
      if (!v) props.remove!()
    }
    return {
      visible,
      visibleChange
    }
  }
})
</script>
