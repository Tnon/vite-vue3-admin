<template>
  <div class="timeLine" v-if="dataSource">
    <template v-for="item in dataSource.list" :key="item.event_at">
      <a-timeline-item color="#F05064">
        <p class="title">{{ t('common.timeRecord', [item.num]) }}</p>
        <p class="time">{{ item.event_at }}</p>
        <p class="desc">{{ item.desc }}</p>
      </a-timeline-item>
    </template>
    <a-pagination
      v-if="dataSource.list.length"
      v-model:current="current"
      v-model:pageSize="pageSize"
      :total="dataSource.total"
      @change="paginationChange"
      @showSizeChange="paginationChange"
      showSizeChanger
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { Timeline, Pagination } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    dataSource: Object
  },
  components: {
    [Timeline.name]: Timeline,
    [Timeline.Item.name]: Timeline.Item,
    [Pagination.name]: Pagination
  },
  setup(_, { emit }) {
    const { t } = useI18n()
    const state = reactive({
      pageOption: {
        current: 1,
        pageSize: 10
      }
    })
    const paginationChange = (page_index, page_size) => {
      emit('changePage', { page_index, page_size })
    }
    return {
      ...toRefs(state.pageOption),
      paginationChange,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.timeLine {
  padding: 24px;
  .title {
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .time,
  .desc {
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
    line-height: 20px;
  }
  .desc {
    font-size: 12px;
  }
}
</style>
