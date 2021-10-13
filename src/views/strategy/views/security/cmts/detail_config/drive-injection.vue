<template>
  <div class="content">
    <!-- 头部 start -->
    <div class="header">
      <a-button type="primary" @click="addConfig">
        {{ t('strategy.addConfig') }}
      </a-button>
    </div>
    <!-- 头部 end -->
    <!-- 表格 start -->
    <a-table
      ref="tableRef"
      :columns="columns"
      row-key="modcfgid"
      :bordered="true"
      :dataSource="injectcfgs"
      class="customStyle"
    >
      <template #action_icon="{ record, index }">
        <a-popover
          placement="leftTop"
          trigger="click"
          overlayClassName="popNoPad"
          destroyTooltipOnHide
          :getPopupContainer="getPopupContainer"
        >
          <template #content>
            <div>
              <a-button
                class="noradiuBtn"
                type="link"
                @click="editRules(record, index)"
              >
                {{ t('commonm.edit') }}
              </a-button>
            </div>
            <a-popconfirm
              placement="leftTop"
              overlayClassName="popHasPad"
              :getPopupContainer="getPopupContainer"
              @confirm="delRules(index)"
            >
              <template v-slot:title> {{ t('common.confirmDel') }} </template>
              <a-button class="noradiuBtn" type="link">
                {{ t('commonm.delete') }}
              </a-button>
            </a-popconfirm>
          </template>

          <a-button type="link">
            <EllipsisOutlined />
          </a-button>
        </a-popover>
      </template>
    </a-table>
    <!-- 表格 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import {
  useColumns,
  addModal,
  useCfgList,
  cfgJsonToObj,
  isExistName
} from './index'
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { useModal } from '@/hooks/use-modal'
import { message, Popover, Popconfirm } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    injectcfgs: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  components: {
    [Popover.name]: Popover,
    EllipsisOutlined,
    [Popconfirm.name]: Popconfirm
  },
  setup(props) {
    const getPopupContainer = (e) => e.parentNode
    const { t } = useI18n()
    const columns = useColumns(t)
    const tableRef = ref<any>()
    //修改
    const editRules = (record, index) => {
      useModal(
        {
          title: t('stragety.editInjCfg'),
          handleOk: async (conRef) => {
            //非空校验
            if (!conRef.tagsList.length) {
              message.error(t('strategy.cfgNotEmp'))
              return Promise.reject('')
            }
            //数据结构体{modname:xxx,modparams:JSON}
            const sendObj = useCfgList(conRef.modalValue)
            //对比改动情况
            if (JSON.stringify(sendObj) !== JSON.stringify(record)) {
              //改后台旧数据加id和flag
              if (record.modcfgid) {
                sendObj.flag = true
                sendObj.modcfgid = record.modcfgid
              }
              //重名校验
              //未改名，直接替换
              if (record.modname === sendObj.modname) {
                props.injectcfgs[index] = sendObj
              } else {
                // 改名 重名校验
                if (isExistName(props.injectcfgs, sendObj.modname)) {
                  props.injectcfgs[index] = sendObj
                } else {
                  message.error(t('strategy.nameExist'))
                  return Promise.reject('')
                }
              }
            }
          },
          contentProps: {
            tagsList: cfgJsonToObj(record.modparams),
            modname: record.modname,
            records: props.injectcfgs
          },
          width: 600
        },
        addModal
      )
    }
    //新增
    const addConfig = () => {
      useModal(
        {
          title: t('strategy.addInjCfg'),
          handleOk: async (conRef) => {
            //非空校验
            if (!conRef.tagsList.length) {
              message.error(t('strategy.cfgNotEmp'))
              return Promise.reject('')
            }
            const sendObj = useCfgList(conRef.modalValue)
            //重名校验
            if (isExistName(props.injectcfgs, sendObj.modname)) {
              props.injectcfgs.push(sendObj)
            } else {
              message.error(t('strategy.nameExist'))
              return Promise.reject('')
            }
          },
          width: 600,
          contentProps: {
            records: props.injectcfgs
          }
        },

        addModal
      )
    }
    //删除
    const delRules = (index) => {
      props.injectcfgs.splice(index, 1)
    }
    return {
      columns,
      addConfig,
      tableRef,
      editRules,
      delRules,
      getPopupContainer,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.content {
  padding: 0 40px;
  .header {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ::v-deep(.ant-input) {
      width: 240px;
      border-radius: 8px;
    }
  }
  .customStyle {
    ::v-deep(td) {
      border-right: none;
      padding: 0 !important;
    }
    ::v-deep(th) {
      border-right: none;
    }
    ::v-deep(td:first-child) {
      padding: 20px !important;
    }
    ::v-deep(td:last-child) {
      padding: 20px !important;
    }
    ::v-deep(.ant-table-body) {
      height: calc(600px);
    }
  }
}
</style>
