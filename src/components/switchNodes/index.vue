<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-17 17:18:45
 * @LastEditTime: 2021-08-10 14:51:20
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
        {{ t(item.title) }}
      </span>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
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
    const { t } = useI18n()
    const SelectType = (type: string | number): void => {
      emit('update:actived', type)
    }
    return {
      t,
      SelectType
    }
  }
})
</script>
<style lang="less" scoped>
.box {
  border-radius: 6px;
  border: 1px solid #e1e1e1;
  display: inline-block;
}
.defaultS {
  margin: 2px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  padding: 5px;
  line-height: 20px;
}
.smallS {
  margin: 2px;
  padding: 0 10px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
}
.actived {
  background: #eeeeee;
  border-radius: 4px;
  font-weight: 600;
  color: #000000;
}
</style>
