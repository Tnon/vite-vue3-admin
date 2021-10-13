<template>
  <div class="box">
    <a-row :gutter="16">
      <a-col span="12">
        <div class="status">
          <div class="head">{{ t('overview.hostStatusMnt') }}</div>
          <div class="content">
            <div class="leftOP" @click="jumpToModal('assets-host-index')">
              <div class="title">
                <span>{{ t('common.allHost') }}</span>
                <custom-icon class="ricon" type="#ax-arrow-right" />
              </div>
              <div class="number">{{ totalCount }}</div>
            </div>
            <div class="line"></div>
            <div style="flex: 1">
              <template v-for="item in list" :key="item.key">
                <div
                  class="rigOP"
                  @click="
                    jumpToModal('assets-host-index', {
                      secure_status: item.value
                    })
                  "
                >
                  <div class="label" :style="{ color: item.color }">
                    <a-badge :color="item.color" class="labBad"></a-badge>
                    {{ item.name }}
                  </div>
                  <a-progress
                    :percent="item.percent"
                    :show-info="false"
                    class="apros"
                    :strokeColor="item.color"
                  />
                  <span class="numb">
                    {{ item.number }}
                  </span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </a-col>
      <template v-for="item in pieList" :key="item.ref">
        <pie-charts v-if="toogleFlag" :option="item" />
      </template>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { Row, Col, Progress, Badge } from 'ant-design-vue'
import pieCharts from './cmts/pieCharts'
import { getStatistics, getOffLineHost } from '@/api/asset/host'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
interface Nodes {
  name: string
  color: string
  number: number
  percent: number
  value: string
}
type List = Nodes[]
export default defineComponent({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Badge.name]: Badge,
    [Progress.name]: Progress,
    pieCharts
  },
  setup() {
    const { t } = useI18n()
    const toogleFlag = ref<boolean>(true)
    const router = useRouter()
    //全部主机
    const totalCount = ref<number>(0)
    const list = ref<List>([
      {
        name: t('common.healthy'),
        color: '#18BA79',
        number: 0,
        percent: 0,
        value: '0'
      },
      {
        name: t('common.attacked'),
        color: '#F05064',
        number: 0,
        percent: 0,
        value: '1'
      },
      {
        name: t('common.atRisk'),
        color: '#F8A454',
        number: 0,
        percent: 0,
        value: '2'
      }
    ])
    const pieList = ref([
      {
        title: t('overview.offLineHostS'),
        ref: 'pieOne',
        color: [
          'rgba(88, 132, 222, 1)',
          'rgba(88, 132, 222, 0.6)',
          'rgba(88, 132, 222, 0.2)'
        ],
        col: [
          {
            key: 'online',
            name: '3 - 7' + t('overview.dayUnit'),
            online: '0',
            color: 'rgba(88, 132, 222, 1)',
            value: 0,
            begin_time: '',
            end_time: ''
          },
          {
            key: 'online',
            name: '7 - 16' + t('overview.dayUnit'),
            online: '0',
            color: 'rgba(88, 132, 222, 0.6)',
            value: 0,
            begin_time: '',
            end_time: ''
          },
          {
            key: 'online',
            name: t('overview.moreThan15'),
            online: '0',
            color: 'rgba(88, 132, 222, 0.2)',
            value: 0,
            begin_time: '',
            end_time: ''
          }
        ]
      },
      {
        ref: 'pieTwo',
        title: t('overview.hostSysDist'),
        color: ['rgba(88, 132, 222, 1)', 'rgba(240, 218, 90, 1)'],
        col: [
          {
            key: 'osver',
            name: 'Windows',
            osver: '1',
            color: 'rgba(88, 132, 222, 1)',
            value: 0
          },
          {
            key: 'osver',
            name: 'Linux',
            osver: '0',
            color: 'rgba(240, 218, 90, 1)',
            value: 0
          }
        ]
      }
    ])
    //获取健康/攻击/风险 数量
    const getStatic = async () => {
      const {
        total,
        healthy_count,
        attacked_count,
        risk_count,
        windows_count,
        linux_count
      } = await getStatistics({ group_id: -1 })
      totalCount.value = total
      unref(list)[0].number = healthy_count
      unref(list)[0].percent = Math.floor((healthy_count / total) * 100)
      unref(list)[1].number = attacked_count
      unref(list)[1].percent = Math.floor((attacked_count / total) * 100)
      unref(list)[2].number = risk_count
      unref(list)[2].percent = Math.floor((risk_count / total) * 100)

      unref(pieList)[1].col[0].value = windows_count
      unref(pieList)[1].col[1].value = linux_count
    }
    getStatic()

    //获取主机离线统计
    const getOfflineHost = async () => {
      toogleFlag.value = false
      const [
        { range0, count: count0, ...dateRange0 },
        { range1, count: count1, ...dateRange1 },
        { range2, count: count2, ...dateRange2 }
      ] = await getOffLineHost({ range: '3-7,7-15,15-' })
      unref(pieList)[0].col[0].value = count0
      unref(pieList)[0].col[1].value = count1
      unref(pieList)[0].col[2].value = count2
      Object.assign(unref(pieList)[0].col[0], dateRange0)
      Object.assign(unref(pieList)[0].col[1], dateRange1)
      Object.assign(unref(pieList)[0].col[2], dateRange2)
      toogleFlag.value = true
    }
    getOfflineHost()
    //路由跳转
    const jumpToModal = (name, query) => {
      router.push({ name, query })
    }
    return {
      list,
      pieList,
      totalCount,
      jumpToModal,
      getOfflineHost,
      toogleFlag,
      t
    }
  }
})
</script>
<style lang="less" scoped>
@import url('./index');
</style>
