<template>
  <!-- 左侧筛选 start -->
  <div :class="collapsed ? 'filterFold' : 'filterL'" class="comFilter">
    <div class="header">
      <span class="title">{{ t('common.filter') }}</span>
      <div class="expand" @click="collapsed = !collapsed">
        <MenuUnfoldOutlined class="colIcon" v-show="collapsed" />
        <MenuFoldOutlined class="colIcon" v-show="!collapsed" />
      </div>
    </div>
    <div v-show="!collapsed">
      <div class="line"></div>
      <slot name="search" />
      <!-- 日期 start -->
      <div class="filter">
        <span class="title">{{ t('log.date') }}</span>
        <a-range-picker
          class="dateRange"
          style="flex: 1"
          v-model:value="dateRangeCmp"
          show-time
          :format="dateFormat"
        />
      </div>
      <!-- 日期 end -->
      <slot name="othFilter" />
    </div>
  </div>
  <!-- 左侧筛选end -->
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { DatePicker } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    [DatePicker.RangePicker.name]: DatePicker.RangePicker
  },
  props: {
    daterange: {
      type: String
    }
  },
  setup(props: { daterange: string }, { emit }) {
    const { t } = useI18n()
    const dateFormat = 'YYYY-MM-DD HH:mm:ss'
    const collapsed = ref<Boolean>(false)
    const dateRangeCmp = computed({
      get: () => (props.daterange ? props.daterange.split(',') : []),
      set: (val) => {
        const [start, end] = val as any
        const daterange = val.length
          ? start.format(dateFormat) + ',' + end.format(dateFormat)
          : ''
        emit('update:daterange', daterange)
      }
    })
    return {
      collapsed,
      dateFormat,
      dateRangeCmp,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.comFilter {
  transition: all 0.3s;
  padding: 16px;
  border-right: 1px solid #eee;
  .header {
    display: flex;
    justify-content: space-between;
    .expand {
      cursor: pointer;
      width: 24px;
      height: 24px;
      text-align: center;
    }
    .colIcon {
      font-size: 14px;
      color: #666;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background: #eee;
    margin: 16px 0;
  }
  .filter {
    .title {
      display: inline-block;
      margin-bottom: 8px;
    }
    .dateRange {
      width: 100% !important;
    }
  }
}
.filterL {
  width: 320px;
}
.filterFold {
  width: 72px;
  .title,
  .filter {
    display: none;
  }
  display: flex;
  justify-content: center;
}
</style>
