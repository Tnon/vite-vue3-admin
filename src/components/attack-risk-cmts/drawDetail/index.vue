<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-05 15:21:08
 * @LastEditTime: 2021-08-08 16:17:12
-->
<template>
  <div class="content">
    <!-- header content start -->
    <draw-header
      :level="record.level"
      v-model:handled="record.handled"
      :host_id="record.host_id"
      :dtype="record.dtype"
      :content_md5="record.content_md5"
      :description="record.description"
      :reload="reload"
      :comment="comment"
      :tags="tags"
      :osver="record.osver"
      :handle="record.handle"
      :modelType="modelType"
      :overview="overview"
      :suggestion="suggestion"
    />
    <!-- header content end -->

    <!-- footer start -->
    <draw-footer
      :modelType="modelType"
      :dtype="record.dtype"
      :dataSource="dataSource"
      @changePage="changePage"
    />
    <!-- footer end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import drawHeader from './header'
import drawFooter from './footer'
import { getDrawDetailMsg } from '@/api/attack_risk'
import { MsgTimeLine } from '@/api/attack_risk/model'
export default defineComponent({
  props: {
    record: {
      type: Object,
      required: true
    },
    reload: Function,
    modelType: Number
  },
  components: {
    drawHeader,
    drawFooter
  },
  setup(props) {
    //record是死区
    const { host_id, content_md5, dtype, handle, create_at, dtypesub } =
      props.record
    //条件结构体
    const state = reactive<MsgTimeLine>({
      filter: {
        host_id,
        content_md5,
        dtype,
        handle,
        create_at,
        dtypesub
      },
      page: {
        page_index: 1,
        page_size: 10
      }
    })

    //返回值结构体
    const reState = reactive({
      //辅助分析
      comment: '',
      // 风险概述
      overview: '',
      //修复建议
      suggestion: '',
      //风险/攻击 全路径
      tags: [],
      //其他
      dataSource: {}
    })
    // 获取详情信息
    const getDetaiMsg = async () => {
      const { comment, path, overview, suggestion, ...dataSource } =
        await getDrawDetailMsg(state)
      reState.comment = comment
      reState.overview = overview
      reState.suggestion = suggestion
      reState.tags = path.split('|')
      reState.dataSource = dataSource
    }
    getDetaiMsg()
    //更新时间轴分页
    const changePage = (page) => {
      Object.assign(state, { page })
      getDetaiMsg()
    }
    return {
      ...toRefs(reState),
      changePage
    }
  }
})
</script>
<style lang="less" scoped>
.content {
  padding: 0 24px;
}
</style>
