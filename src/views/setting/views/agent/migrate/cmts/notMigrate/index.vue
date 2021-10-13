<template>
  <div
    class="nMigrate"
    @click="showModal"
    :style="{ color: uneffected ? 'rgb(248, 160, 76)' : '' }"
  >
    {{ uneffected }}
  </div>
</template>

<script lang="ts">
import { SlotsTable } from '@/components/slots-table'
import { defineComponent } from 'vue'
import { useModal } from '@/hooks'
import { useColumns } from '../columns'
import { getMigrateDetail } from '@/api/setting/agent'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    uneffected: Number,
    callback: Function,
    group_id: Number
  },
  setup(props) {
    const { t } = useI18n()
    const showModal = () => {
      props.callback!()
      useModal(
        {
          width: 1000,
          title: t('setting.migDetail'),
          handleOk: (modelRef) => {},
          contentProps: {
            class: 'tabled',
            columns: useColumns(t),
            getListFunc: getMigrateDetail,
            rowKey: 'host_id',
            customReload: props.callback!,
            arguments: {
              group_id: props.group_id!
            }
          }
        },
        SlotsTable
      )
    }
    return {
      showModal
    }
  }
})
</script>

<style lang="less" scoped>
.nMigrate {
  cursor: pointer;
}
</style>
