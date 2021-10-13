<template>
  <div class="backup">
    <div class="header">{{ t('setting.backup') }}</div>
    <div class="backupNow">
      <!-- 进度条 start -->
      <a-progress
        class="uploadprogre"
        :strokeWidth="2"
        :showInfo="false"
        strokeColor="#18ba79"
        :percent="uplpadPrg"
        v-if="uplpadPrg !== 0 && uplpadPrg !== 100"
        status="active"
      />
      <!-- 进度条 end -->
      <a-button type="primary" @click="bakDataBase">
        {{ t('setting.backNow') }}
      </a-button>
      <upload-file
        action="/api/admin/import_backup"
        :accept="'.gz'"
        @change="uploadBak"
      >
        <a-button type="dashed">{{ t('setting.iptBak') }}</a-button>
      </upload-file>
      <span class="desc" :title="t('setting.backTitle')">
        {{ t('setting.backTitle') }}
      </span>
      <a-button type="primary" @click="refreshTable" style="float: right">
        {{ t('setting.refreshN') }}
      </a-button>
    </div>
    <slots-table
      ref="tableRef"
      class="dataTable"
      v-model:columns="columns"
      row-key="id"
      :get-list-func="getDataBackupApi"
    />
  </div>
</template>

<script lang="ts">
import { createVNode, defineComponent, ref } from 'vue'
import { SlotsTable } from '@/components/slots-table'
import { useColumns } from './index'
import { message, Progress } from 'ant-design-vue'
import uploadFile, { FileInfo } from '@/components/upload-file'
import { getDataBackupApi, backup_database } from '@/api/setting/server'
import { useModal } from '@/hooks'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    SlotsTable,
    uploadFile,
    [Progress.name]: Progress
  },
  setup() {
    const { t } = useI18n()
    const columns = useColumns(t)
    const tableRef = ref<any>(null)
    //上传进度
    const uplpadPrg = ref<number>(0)
    //立即备份
    const bakDataBase = () => {
      useModal(
        {
          title: t('setting.cfmBack'),
          handleOk: async () => {
            await backup_database()
            refreshTable()
          }
        },
        createVNode('span', {}, '')
      )
    }
    //导入备份
    const uploadBak = (info: FileInfo) => {
      //百分比
      uplpadPrg.value = Math.floor(info.file.percent as number)
      //上传接口失败
      if (info.file.status === 'error') {
        message.error(t('common.serverError'))
      }
      if (info.file.response) {
        if (info.file.response.code) {
          message.error(info.file.response.msg || t('setting.uploadError'))
        } else {
          message.success(t('setting.uploadSuc'))
          refreshTable()
        }
      }
    }
    const refreshTable = () => {
      tableRef.value.refreshTableData()
    }
    return {
      tableRef,
      columns,
      getDataBackupApi,
      bakDataBase,
      uploadBak,
      uplpadPrg,
      refreshTable,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.backup {
  border-radius: 8px;
  background: #fff;
  height: 100%;
  margin-left: 16px;
  .header {
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
  }
  .backupNow {
    padding: 0 24px;
    margin-bottom: 12px;
    position: relative;
    button {
      margin-right: 10px;
    }
    .desc {
      font-size: 12px;
      color: #f8a04c;
      line-height: 18px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      max-width: 500px;
      display: inline-block;
    }
    .uploadprogre {
      position: absolute;
      bottom: -18px;
      left: 0;
    }
  }
}
.dataTable {
  ::v-deep(.ant-table-body) {
    height: calc(100vh - 189px);
  }
}
</style>
