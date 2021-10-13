<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-04 09:38:07
 * @LastEditTime: 2021-08-04 09:41:55
-->
<template>
  <a-select
    :placeholder="placehodler"
    @change="changeSelect"
    allowClear
    v-model:value="valueCmp"
    class="selectS"
    ref="select"
  >
    <a-select-option v-for="item in options" :value="item.id" :key="item.id">
      {{ item.name }}
    </a-select-option>
  </a-select>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    options: [Object, Array],
    placehodler: String,
    value: [String, Number]
  },
  setup(props, { emit }) {
    const changeSelect = (v) => {
      emit('changeValue', v)
    }
    const valueCmp = computed({
      get: () => {
        if (props.value === 0) {
          return undefined
        }
        return props.value ?? undefined
      },
      set: (val) => emit('update:value', val)
    })
    return {
      changeSelect,
      valueCmp
    }
  }
})
</script>
<style lang="less" scoped>
.selectS {
  width: 100%;
}
</style>
