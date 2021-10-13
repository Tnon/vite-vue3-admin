<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2021-10-08 16:32:24
-->
<template>
  <div class="userContainer">
    <div class="header">
      <!-- title start -->
      <span class="title" v-if="!isCheck">{{ t('report.adminMag') }}</span>
      <!-- title end -->
      <!-- 批量删除 start -->
      <batch-bar v-model:isCheck="isCheck" v-else class="batbar">
        <template #title>
          {{ t('user.delRecord', [tableRef.selectAllNumber]) }}
        </template>
        <template #button>
          <a-button
            type="primary"
            danger
            :disabled="!tableRef.selectAllNumber"
            @click="delUsers"
          >
            {{ t('common.delete') }}
          </a-button>
        </template>
      </batch-bar>
      <!-- 批量删除 end -->
      <div class="tools">
        <!-- 搜索 start -->
        <span>
          <a-input-search
            class="search"
            v-model:value.trim="name"
            :placeholder="t('user.emacname')"
            @search="onSearch"
            @change="onSearch"
          />
        </span>
        <!-- 搜索 end -->

        <!-- 批量标记 start -->
        <span class="mark" @click="showCheckbox">
          <a-button type="link">
            <template #icon>
              <CarryOutOutlined />
            </template>
            {{ t('common.batchOpt') }}
          </a-button>
        </span>
        <!-- 批量标记 end-->

        <!-- 新增管理员 start -->
        <a-button type="primary" @click="NewUser">
          <template #icon>
            <PlusOutlined />
          </template>
          {{ t('user.addUser') }}
        </a-button>
        <!-- 新增管理员 end -->

        <div class="line"></div>
        <!-- 导出 start -->
        <ExportOutlined @click="exportFile" class="exportIc" />
        <!-- 导出 end -->
      </div>
    </div>
    <slots-table
      class="subTable"
      :isCheck="isCheck"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :get-list-func="getUserList"
      :allowCheckAll="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, unref, ref, reactive, toRefs } from 'vue'
import { SlotsTable } from '@/components/slots-table'
import { getUserList, addUser, batchDelUsers } from '@/api/user'
import { useColumns } from './index'
import { useModal } from '@/hooks'
import {
  CarryOutOutlined,
  PlusOutlined,
  ExportOutlined
} from '@ant-design/icons-vue'
import { addModal } from './cmts/addModal'
import { initRowSelection } from '@/components/slots-table/hooks'
import { pCompile } from '@/utils/urlUtils'
import { exportExcel } from '@/utils/tools'
import { batchBar } from '@/components/batch-bar'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    SlotsTable,
    CarryOutOutlined,
    PlusOutlined,
    ExportOutlined,
    batchBar
  },
  setup() {
    const { t } = useI18n()
    const columns = useColumns(t)
    //table dom
    const tableRef: any = ref<HTMLElement>()
    //全选
    const isCheck = ref<boolean>(false)
    //批量选择
    const showCheckbox = () => {
      isCheck.value = !isCheck.value
    }
    //搜索数据源
    const agms = reactive({
      name: ''
    })
    //添加管理员
    const NewUser = () => {
      useModal(
        {
          title: t('user.addUser'),
          handleOk: async (modelRef) => {
            await unref(modelRef.slotRef).validate()
            const sendForm = { ...modelRef.state.formData }
            sendForm.password = pCompile(sendForm.password)
            sendForm.password_p = pCompile(sendForm.password_p)
            await addUser(sendForm)
            refreshTable()
          }
        },
        addModal
      )
    }
    //
    //删除管理员
    const delUsers = async () => {
      // console.log()
      await batchDelUsers({
        useridarr: unref(tableRef).rowSelection.selectedRowKeys as number[]
      })
      refreshTable()
    }
    //刷新表格的方法
    const refreshTable = () => {
      unref(tableRef).refreshTableData()
      initRowSelection()
    }
    // 搜索框变化刷新表格
    const onSearch = (v, e) => {
      const { value } = v.target ?? { value: v }
      if (e && value) {
        refreshTable()
        initRowSelection()
      }
      if (!value && !e) {
        refreshTable()
        initRowSelection()
      }
    }
    //导出
    const exportFile = () => {
      exportExcel('/api/export/users', { filter: agms })
    }
    return {
      agms,
      columns,
      tableRef,
      ...toRefs(agms),
      getUserList,
      NewUser,
      showCheckbox,
      isCheck,
      onSearch,
      delUsers,
      exportFile,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.userContainer {
  padding: 0 24px;
  .header {
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    .title {
      font-weight: 700;
      font-size: 16px;
    }
    .mark {
      margin: 0 16px;
    }
    .tools {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .subTable {
    ::v-deep(.ant-table-body) {
      height: calc(100vh - 121px);
    }
  }
}
.batbar {
  flex: 1;
  background: rgba(24, 186, 121, 0.1);
  border-radius: 4px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
}
.exportIc {
  cursor: pointer;
}
.line {
  width: 1px;
  height: 16px;
  background: #e1e1e1;
  margin: 0 16px;
}
</style>
