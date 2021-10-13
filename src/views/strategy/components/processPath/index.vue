<template>
  <div>
    <template v-for="item in list" :key="item">
      <!-- <a-tooltip>
        <template #title>{{ item }}</template> -->
      <li :title="item">
        {{ item }}
      </li>
      <!-- </a-tooltip> -->
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref, watchEffect } from 'vue'
// import { Tooltip } from 'ant-design-vue'
export default defineComponent({
  // components: {
  //   [Tooltip.name]: Tooltip
  // },
  props: {
    type: String,
    modparams: String
  },
  setup(props) {
    const list: any = ref<string[]>([])
    watchEffect(() => {
      list.value = []
      JSON.parse(props.modparams!).forEach((ele) => {
        unref(list).push(ele[props.type!])
      })
    })

    return {
      list
    }
  }
})
</script>

<style lang="less" scoped>
li {
  height: 56px;
  line-height: 56px;
  border-bottom: 1px solid #eee;
  padding: 0 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
li:last-child {
  border: none;
}
</style>
