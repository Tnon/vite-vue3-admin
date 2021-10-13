<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-30 18:49:59
 * @LastEditTime: 2021-09-09 12:01:43
-->
<template>
  <span :style="{ color }" class="nodes" @click="openDetail">
    {{ `${status_text} (${status_count})` }}
  </span>
</template>
<script lang="ts">
import { SlotsTable } from '@/components/slots-table'
import { useModal } from '@/hooks'
import { defineComponent, reactive, watchEffect, ref } from 'vue'
import { getAdapted_host_list } from '@/api/setting/agent'
import { useColumns } from './index'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    status: Number,
    status_count: Number,
    status_text: String,
    os: String,
    record: Object
  },
  setup(props) {
    const { t } = useI18n()
    const color = ref<string>('')
    watchEffect(() => {
      switch (props.status) {
        //最新版本
        case 0:
          color.value = '#000'
          break
        // 可升级
        case 1:
          color.value = '#F8A454'
          break
        //待升级
        case 2:
          color.value = '#F8A454'
          break
        // 升级中
        case 3:
          color.value = '#18BA79'
          break
        //升级失败
        case 4:
          color.value = '#F05064'
          break
        //agent版本不匹配
        case 5:
          color.value = '#F05064'
          break
      }
    })

    const openDetail = () => {
      useModal(
        {
          title: props.os!,
          width: 1080,
          contentProps: {
            columns: useColumns(t),
            class: 'tabled',
            rowKey: 'host_id',
            arguments: reactive({ ip: '', os: props.os! }),
            getListFunc: getAdapted_host_list
          }
        },
        SlotsTable
      )
    }
    return {
      color,
      openDetail
    }
  }
})
</script>
<style lang="less" scoped>
.nodes {
  cursor: pointer;
}
</style>
