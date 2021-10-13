<template>
  <div ref="chartRef" class="charts"></div>
</template>
<script lang="ts">
import { defineComponent, watch, onMounted, ref, Ref, createVNode } from 'vue'
import { useECharts } from '@/hooks'
import { Props } from '../disbChart/type'
import { getLineData } from '@/api/overview'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    RType: {
      type: Number,
      default: 1
    },
    LType: {
      type: Number,
      default: 1
    }
  },
  setup(props: Props) {
    const { t } = useI18n()
    //chart 元素
    const chartRef = ref<HTMLDivElement | null>(null)
    const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>)
    const getChartsData = async (v = 1) => {
      const { fields, values } = await getLineData({
        interval: props.RType,
        type: props.LType
      })

      setOptions({
        tooltip: {
          trigger: 'axis',
          padding: 16,
          formatter: ([params]) => {
            return `<div class='timeLabel'>
                          <span>${params.seriesName}</span>
                          <span>${t('common.unhandled')}</span>
                      </div>
                      <div class='valueLabel'>
                        <span class='label'">${params.name}</span>
                        <span class='value' style='color:${params.color}'>${
              params.value
            }</span>
                      </div>
                      `
          }
        },
        grid: {
          left: '0%',
          right: '1%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            inside: true, // 刻度朝内
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: 'rgba(0, 0, 0, 0.45)'
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          data: fields
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          axisTick: {
            inside: true, // 刻度朝内,
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: v === 1 ? t('attack.allAttack') : t('risk.allRisk'),
            type: 'line',
            itemStyle: {
              color: v === 1 ? '#F05064' : '#F8A454'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color:
                      v === 1
                        ? 'rgba(240, 80, 100, 0.1)'
                        : 'rgba(242, 200, 100, 0.1)'
                  },
                  {
                    offset: 1,
                    color:
                      v === 1
                        ? 'rgba(249, 136, 157, 0)'
                        : 'rgba(242, 170, 100, 0) '
                  }
                ],
                false
              ),
              shadowColor: 'rgba(240, 80, 100, 0.08)',
              shadowBlur: 200
            },
            data: values,
            animationDuration: 2000
          }
        ]
      })
    }

    onMounted(() => {
      getChartsData()
    })
    watch([() => props.LType, () => props.RType], ([v]) => {
      getChartsData(v)
    })
    return { chartRef }
  }
})
</script>
<style lang="less" scoped>
.charts {
  height: 323px;
}
.aaa {
  width: 200px;
}
</style>
