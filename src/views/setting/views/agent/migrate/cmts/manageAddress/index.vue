<template>
  <div>
    <template v-for="item in ipGroup" :key="item">
      <a-tag class="cusTag" @click="showModal">{{ item }}</a-tag>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useColumns } from '../columns'
import { useModal } from '@/hooks/use-modal'
import { SlotsTable } from '@/components/slots-table'
import { getMigrateDetail } from '@/api/setting/agent'
import { Tag } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Tag.name]: Tag
  },
  props: {
    ipGroup: Array,
    group_id: Number,
    reload: Function
  },
  setup(props) {
    const { t } = useI18n()
    const showModal = () => {
      props.reload!()
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
            customReload: props.reload!,
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
.cusTag {
  color: #fff;
  background: rgb(137, 212, 174);
  cursor: pointer;
  border: none;
  padding: 3px 5px;
  margin: 5px 5px 5px 0px;
}
</style>
