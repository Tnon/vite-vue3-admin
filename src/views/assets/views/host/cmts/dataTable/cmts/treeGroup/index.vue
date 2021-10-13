<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-16 19:16:09
 * @LastEditTime: 2021-07-19 10:58:15
-->
<template>
  <div>
    <template v-for="(item, index) in group_kv_path" :key="item.id">
      <span
        class="nodes"
        @click="openTree(item, index)"
        :class="{ prevNodes: index < group_kv_path.length - 1 }"
      >
        {{ item.name }}
      </span>
      <span class="line prevNodes" v-if="index < group_kv_path.length - 1">
        /
      </span>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  props: {
    group_kv_path: Array
  },
  setup(props) {
    const openTreeG: any = inject('openTree')
    // 展开的数组
    const getExpendId = (index: number): number[] => {
      let expArr: number[] = []
      props.group_kv_path
        ?.filter((e, ind) => ind < index)
        .forEach((ele: any) => {
          expArr.push(ele.id as number)
        })
      return expArr
    }
    const openTree = ({ id, name }, index) => {
      const expArr: number[] = getExpendId(index)
      openTreeG(id, name, expArr)
    }
    return {
      openTree
    }
  }
})
</script>
<style lang="less" scoped>
.nodes {
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #18ba79;
    cursor: pointer;
    padding: 0 5px;
  }
}
.line {
  margin: 0 5px;
}
.prevNodes {
  display: none;
}
</style>
