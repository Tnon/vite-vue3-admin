<template>
  <div>
    <!-- 安全提醒 start -->
    <safety-alert
      v-if="!!safetyStatus.risk_count || !!safetyStatus.attacked_count"
      :safetyStatus="safetyStatus"
      :host_ip="host_ip"
    />
    <!-- 安全提醒 end -->

    <!-- cpu 内存 硬盘 start -->
    <allRate :rates="rates" />
    <!-- cpu 内存 硬盘 end -->

    <!-- 基础信息 start-->
    <detailInfo v-bind="{ baseInfo, hostManage, agent }" />
    <!-- 基础信息 end-->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import safetyAlert from './cmts/safetyAlert'
import allRate from './cmts/allRate'
import detailInfo from './cmts/detailInfo'
import { HostDetail } from '@/api/asset/host'
import { isArray } from '@/utils/is'
export default defineComponent({
  props: {
    id: String,
    host_ip: String
  },
  components: {
    safetyAlert,
    allRate,
    detailInfo
  },
  setup(props) {
    //状态仓
    const state = reactive({
      //安全提醒
      safetyStatus: {
        risk_count: 0,
        attacked_count: 0
      },

      //cpu 内存 硬盘
      rates: {
        cpu_util: 0,
        cpu_cores: 0,
        mem_util: 0,
        mem_size: 0,
        disk_size: 0,
        disk_util: 0
      },

      //基础信息
      baseInfo: {
        logon_username: '',
        computer_name: '',
        ip: '',
        external_ip: '',
        mac: '',
        gateway: '',
        os: '',
        kernel_version: '',
        arch: '',
        jdk_version: '',
        last_online_at: '',
        last_offline_at: '',
        web_middleware_version: '',
        accounts: ''
      },

      // 主机管理
      hostManage: {
        group_kv_path: '',
        tag: ''
      },
      // Agent信息
      agent: {
        host_id: '',
        agent_version: '',
        info_time: '',
        drive_version: '',
        agent_jdk_version: '',
        behavior_lib_version: '',
        created_at: ''
      }
    })
    //获取所有信息
    const getHostDetail = async () => {
      const res = await HostDetail(props.id!)
      for (let k in state) {
        for (let ak in state[k]) {
          if (ak === 'group_kv_path' && isArray(res[ak])) {
            state[k][ak] = res[ak].map((val) => val.name).join(' / ')
          } else {
            state[k][ak] = res[ak]
          }
        }
      }
    }
    getHostDetail()
    return {
      ...toRefs(state)
    }
  }
})
</script>
