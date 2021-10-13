<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-16 19:16:09
 * @LastEditTime: 2021-07-19 10:58:15
-->
<template>
  <div>
    <template v-for="(item, index) in group_kv_path" :key="item.id">
      <span>
        {{ item.name }}
        <span v-if="index < group_kv_path.length - 1"> / </span>
      </span>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    group_kv_path: Array
  }
})
</script>
