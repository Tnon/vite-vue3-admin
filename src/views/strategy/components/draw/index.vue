<template>
  <div>
    <!-- 策略标题描述 start -->
    <div class="draw_header">
      <div class="title">{{ title }}</div>
      <div class="desc">{{ desc }}</div>
    </div>
    <!-- 策略标题描述 end -->
    <!-- 头部 start -->
    <div class="header">
      <div class="title">{{ options.group_name }}</div>
      <div class="text">{{ t('strategy.straAppTime') }}{{ send_time }}</div>
    </div>
    <!-- 头部 end-->

    <!-- 下发范围 start -->
    <a-row :gutter="10" class="effect">
      <a-col span="6">
        <div class="text">{{ t('strategy.disScope') }}</div>
        <div class="value">{{ total }}</div>
      </a-col>
      <a-col span="6">
        <div class="text">{{ t('asset.effeVe') }}</div>
        <div class="value">{{ success }}</div>
      </a-col>
      <a-col span="6">
        <div class="text">{{ t('asset.notEffe') }}</div>
        <div class="value orange">{{ fail }}</div>
      </a-col>
    </a-row>
    <!-- 下发范围 end -->

    <!-- 表格 start -->
    <slots-table
      ref="tableRef"
      v-model:columns="columns"
      row-key="host_id"
      :get-list-func="getEffectHosts"
      :arguments="agms"
      class="drawTable"
    />
    <!-- 表格 end -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, PropType, toRefs } from 'vue'
import { useColumns, GroupMsg } from './index'
import { Row, Col } from 'ant-design-vue'
import { SlotsTable } from '@/components/slots-table'
import { getEffectOption, getEffectHosts } from '@/api/strategy/security'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    options: {
      type: Object as PropType<GroupMsg>
    },
    desc: String,
    title: String,
    policy_type: Number
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    SlotsTable
  },

  setup(props) {
    const { t } = useI18n()
    const columns = useColumns(t)
    const tableRef = ref<any>('')
    const agms = reactive({
      group_id: props.options!.group_id,
      policy_type: props.policy_type
    })
    //生效时间 下发范围 生效数量/未生效数量
    const stateOption = reactive({
      send_time: '',
      total: 0,
      success: 0,
      fail: 0
    })
    const getStateOption = async () => {
      const { send_time, total, success, fail } = await getEffectOption({
        group_id: props.options!.group_id,
        policy_type: props.policy_type!
      })
      stateOption.send_time = send_time
      stateOption.total = total
      stateOption.success = success
      stateOption.fail = fail
    }
    getStateOption()
    return {
      ...toRefs(stateOption),
      getEffectHosts,
      columns,
      tableRef,
      agms,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.draw_header {
  background: #fafafa;
  position: absolute;
  left: 0;
  top: 0;
  padding: 24px;
  width: 100%;
  .title {
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-weight: 800;
    margin-bottom: 8px;
  }
  .desc {
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    height: 50px;
    overflow: auto;
  }
}
.header {
  padding: 24px 0;
  margin-top: 104px;
  .title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
  }
}
.text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}
.effect {
  margin-bottom: 24px;
  .value {
    font-size: 20px;
    font-weight: 600;
  }
  .orange {
    color: #f8a04c;
  }
}
.drawTable {
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 389px);
  }
}
</style>
