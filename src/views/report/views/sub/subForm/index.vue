<template>
  <div>
    <!-- 新建订阅 -->
    <slots-form
      ref="slotsRef"
      :formItemLayout="formItemLayout"
      :colsMap="formItems"
      :fields="fields"
    />

    <!-- 发送报表时间 -->
    <div class="sendReport">
      <h3>{{ t('report.repSenTime') }}</h3>
      <template v-for="item in everyWMType" :key="item.value">
        <div
          class="everyWM"
          :class="agms.round == item.value ? 'actived' : ''"
          @click="toogleWM(item.value)"
        >
          {{ item.label }}
        </div>
      </template>
    </div>

    <!-- 订阅邮箱 -->
    <div>
      <h3>{{ t('report.subEmail') }}</h3>
      <sub-email v-model:tagList="agms.emails" />
    </div>
    <!-- 每周、每月弹框 -->
    <div>
      <template v-for="(item, key) in weekMonthData" :key="key">
        <week-month
          v-if="agms.round === key"
          :types="item"
          :type="key"
          v-model:agms="agms"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'
import weekMonth from './cmts/weekMonth/index.vue'
import subEmail from './cmts/subEmail/index.vue'
import {
  useWeekMonthData,
  useEveryWMType,
  useFormItems,
  NofieldState
} from './index'
import slotsForm from '@/components/slots-form'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    weekMonth,
    subEmail,
    slotsForm
  },
  props: {
    fields: Object,
    agms: {
      type: Object as PropType<NofieldState>,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n()
    const weekMonthData = useWeekMonthData(t)
    const everyWMType = useEveryWMType(t)
    const formItems = useFormItems(t)
    const slotsRef = ref<any>()
    const formItemLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 }
    }
    // 每周每月切换
    const toogleWM = (val) => {
      props.agms.round = val
      props.agms.week = []
      props.agms.month = []
    }

    return {
      weekMonthData,
      toogleWM,
      everyWMType,
      formItemLayout,
      formItems,
      slotsRef,
      t
    }
  }
})
</script>

<style lang="less" scoped>
::v-deep(.ant-select, .ant-input) {
  width: 100%;
}
.subName,
.subReport,
.sendReport {
  margin-bottom: 24px;
}
.subReport {
  margin-bottom: 32px;
}
h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
}
.sendReport {
  .everyWM {
    padding-left: 24px;
    height: 40px;
    line-height: 40px;
    border-radius: 8px;
  }
  .actived {
    background: #f8f8f8;
  }
}
</style>
