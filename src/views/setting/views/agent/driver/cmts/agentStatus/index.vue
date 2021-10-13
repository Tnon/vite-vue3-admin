<template>
  <div>
    <span class="succss" v-if="agentSta === true">
      {{ t('common.success') }}
    </span>
    <template v-else-if="agentSta === false">
      <div class="tablePopover">
        <a-popover trigger="hover" placement="right" destroyTooltipOnHide>
          <template #content>
            <a-table
              :columns="columns"
              :data-source="dataSource"
              class="smallTable"
              :pagination="false"
              rowKey="name"
            />
          </template>
          <span class="fail"> {{ t('common.fail') }}</span>
        </a-popover>
      </div>
    </template>
    <span v-else>-</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { Popover } from 'ant-design-vue'
import { useColumns, dataType } from '../index'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Popover.name]: Popover
  },
  props: {
    agentStatus: Object
  },
  setup(props) {
    const { t } = useI18n()
    const columns = useColumns(t)
    //pop table数据
    const dataSource = ref<dataType[]>([])
    //object==>array
    for (let name in props.agentStatus!) {
      unref(dataSource).push({ name, status: props.agentStatus![name] })
    }
    //成功/失败
    const agentSta = unref(dataSource).every((ele) => ele.status)
    return {
      columns,
      agentSta,
      dataSource,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.succss {
  color: #19be68;
}
.fail {
  color: #ff0000;
}
.smallTable {
  ::v-deep(td) {
    padding: 10px 14px !important;
  }
  ::v-deep(th) {
    padding: 10px 14px !important;
  }
}
</style>
