<template>
  <div class="bk_br_sd content">
    <template v-for="item in agentDownload" :key="item">
      <div class="client">
        <!-- 标题 -->
        <div class="title">
          <span class="line"></span>
          <span>{{ item }} {{ t('setting.clintAAdL') }}</span>
        </div>

        <!-- windows/linux客户端 -->
        <client :osType="item" :formData="state[item]" :isShow="true" />

        <!-- 适配驱动库支持 -->
        <div class="title">
          <span class="line"></span>
          <span>{{ t('setting.adaDlSpt') }}</span>
        </div>
        <slots-table
          class="dataTable"
          rowKey="name"
          :columns="columns"
          :get-list-func="getDriverList"
          :arguments="getAgms(item)"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useColumns } from './index'
import client from '../../download/client/index.vue'
import { SlotsTable } from '@/components/slots-table'
import { getPkgVer, getDriverList } from '@/api/setting/agent'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    client,
    SlotsTable
  },
  setup() {
    const { t } = useI18n()
    const columns = useColumns(t)
    const agentDownload = ['Windows', 'Linux']

    //工厂函数给表格传参
    const getAgms = (osver) => {
      const agms: any = {}
      agms.osver = osver === 'Windows' ? '1' : '0'
      return agms
    }
    //版本信息
    const state = reactive<{ Windows: any; Linux: any }>({
      Windows: {},
      Linux: {}
    })

    //获取版本信息
    const getPackageVersions = async () => {
      const { windows, linux } = await getPkgVer()
      state.Windows = windows ?? {}
      state.Linux = linux ?? {}
    }
    getPackageVersions()
    return {
      agentDownload,
      columns,
      getDriverList,
      state,
      getAgms,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.content {
  width: 1280px;
  margin: 16px auto;
  display: flex;
  height: calc(100vh - 96px);
  .client {
    padding: 24px 40px;
    width: 100%;
    border-right: 1px solid #eee;
    .title {
      font-size: 16px;
      font-weight: 600;
      .line {
        width: 4px;
        height: 16px;
        display: inline-block;
        background: #18ba79;
        border-radius: 8px;
        margin-right: 16px;
      }
    }
    .dataTable {
      margin-top: 16px;
      ::v-deep(.ant-table-body) {
        height: calc(100vh - 574px);
      }
    }
    &:last-child {
      border-right: none;
    }
  }
}
</style>
