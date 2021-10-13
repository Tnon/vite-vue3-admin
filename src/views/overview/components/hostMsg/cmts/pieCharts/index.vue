<template>
  <a-col span="6">
    <!--  -->
    <div class="box">
      <div class="header">{{ $props.option.title }}</div>
      <div class="cont">
        <div ref="chartRef" class="charts"></div>
        <div style="flex: 1">
          <template v-for="item in $props.option.col" :key="item.name">
            <div
              class="colum"
              @click="
                jumpToModal('assets-host-index', {
                  [item.key]: item[item.key],
                  dataRange: item.begin_time + ',' + item.end_time
                })
              "
            >
              <a-badge :color="item.color" class="labBad" />
              <span class="label">{{ item.name }}</span>
              <span class="numb">{{ item.value }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </a-col>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted, PropType } from 'vue'
import { Col, Badge } from 'ant-design-vue'
import { useECharts } from '@/hooks'
import { Props, Nodes } from './type'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    option: Object as PropType<Nodes>
  },
  components: {
    [Col.name]: Col,
    [Badge.name]: Badge
  },
  setup(props: Props) {
    const router = useRouter()
    const chartRef = ref<HTMLDivElement | null>(null)
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)
    onMounted(() => {
      setOptions({
        series: [
          {
            color: props.option.color,
            type: 'pie',
            radius: ['40%', '80%'],
            label: {
              show: false
            },
            data: props.option.col
          }
        ]
      })
    })
    //路由跳转
    const jumpToModal = (name, query) => {
      if (query.osver) {
        delete query['dataRange']
      }
      router.push({ name, query })
    }
    return {
      chartRef,
      jumpToModal
    }
  }
})
</script>
<style lang="less" scoped>
.box {
  height: 240px;
  background: #fff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
}
.charts {
  height: 100px;
  width: 100px;
  margin-right: 10px;
}
.header {
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  height: 48px;
  line-height: 48px;
}
.cont {
  padding: 0 30px;
  display: flex;
  align-items: center;
  height: 192px;
  .colum {
    display: flex;
    margin: 10px 0;
    cursor: pointer;
    transition: all 0.3s;
    padding-right: 6px;
    &:hover {
      padding-right: 2px;
    }
  }
  .label {
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .numb {
    flex: 1;
    text-align: right;
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
