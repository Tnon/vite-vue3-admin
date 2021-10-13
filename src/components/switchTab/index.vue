<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-17 17:18:45
 * @LastEditTime: 2021-08-10 14:51:46
-->
<template>
  <div class="box">
    <template v-for="item in types" :key="item.type">
      <span
        class="defaultS"
        :style="style"
        :class="{
          actived: item.type === actived,
          smallS: $attrs.size === 'small'
        }"
        @click="SelectType(item.type)"
      >
        {{ item.title }}
      </span>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Types } from './type'
export default defineComponent({
  props: {
    types: {
      type: Array as PropType<Types[]>
    },
    actived: {
      type: [String, Number] as PropType<string | number>
    },
    style: {
      type: Object
    }
  },
  emits: ['update:actived'],
  setup(_, { emit }) {
    const SelectType = (type: string): void => {
      emit('update:actived', type)
    }
    return {
      SelectType
    }
  }
})
</script>
<style lang="less" scoped>
.defaultS {
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
}
.actived {
  background: #e6e6e6;
  font-weight: 600;
  color: #000000;
}
</style>
