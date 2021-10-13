<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2021-09-30 16:24:47
-->
<template>
  <div class="header">
    <!-- 标题 start -->
    <div class="headerL" v-if="!isCheck">{{ $attrs.titleMsg }}</div>
    <!-- 标题 end -->
    <!-- 批量删除 start -->
    <batch-bar v-model:isCheck="isCheckCmp" v-else>
      <template #title>
        {{ t('strategy.delPol', [selectedRecord.length]) }}
      </template>
      <template #button>
        <a-button
          type="primary"
          :disabled="!selectedRecord.length"
          danger
          @click="delStrategy"
        >
          {{ t('common.delete') }}
        </a-button>
      </template>
    </batch-bar>
    <!-- 批量删除 end -->
    <div class="headerR">
      <a-input-search
        v-model:value.trim="searchValue"
        :placeholder="t('strategy.searchName')"
        @change="searchData"
        @search="searchData"
        class="search"
      />
      <!-- 批量管理 start -->
      <a-button type="link" :class="{ actived: isCheck }" @click="showCheckBox">
        <CarryOutOutlined />
        {{ t('common.batchOpt') }}
      </a-button>
      <!-- 批量管理 end -->
      <!-- 策略应用 start -->
      <a-button type="link" @click="stategyApply">
        <SettingOutlined />
        {{ t('strategy.poliApply') }}
      </a-button>
      <!-- 策略应用 end -->
      <!-- 创建策略 start -->
      <a-button
        type="primary"
        class="createStr"
        @click="createStrategy($attrs.path)"
      >
        <PlusOutlined />
        {{ t('strategy.creat') }}
      </a-button>
      <!-- 创建策略 end -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useModal } from '@/hooks'
import { stategyModal } from '../index'
import {
  getStategyList,
  setStategyList,
  delSercuity
} from '@/api/strategy/security'
import { delDomain } from '@/api/strategy/domain'
import {
  PlusOutlined,
  SettingOutlined,
  CarryOutOutlined
} from '@ant-design/icons-vue'
import { batchBar } from '@/components/batch-bar'
import { initRowSelection } from '@/components/slots-table/hooks'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    },
    isCheck: Boolean,
    selectedRecord: Array,
    policyType: Number
  },
  components: {
    PlusOutlined,
    SettingOutlined,
    CarryOutOutlined,
    batchBar
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const router = useRouter()
    const searchValue = computed({
      get: () => props.value,
      set: (newVal) => emit('update:value', newVal)
    })
    const isCheckCmp = computed({
      get: () => props.isCheck,
      set: (newVal) => emit('update:isCheck', newVal)
    })
    // 创建策略
    const createStrategy = (name) => {
      router.push({
        name
      })
    }
    //批量管理
    const showCheckBox = () => {
      emit('update:isCheck', !props.isCheck)
    }
    //策略应用
    const stategyApply = async () => {
      const items = await getStategyList({ policy_type: props.policyType! })
      useModal(
        {
          title: t('strategy.poliApply'),
          width: 840,
          contentProps: {
            options: items,
            policyType: props.policyType
          },
          wrapClassName: 'modalBodyNopad',
          handleOk: async (contentRef) => {
            // if (!contentRef.modalValue.switch.length) {
            //   message.error('未修改策略应用！')
            //   return Promise.reject('')
            // }
            await setStategyList(
              Object.assign(contentRef.modalValue, {
                policy_type: props.policyType
              })
            )
            emit('refreshTable')
          }
        },
        stategyModal
      )
    }
    //批量删除
    const delStrategy = async () => {
      if (props.policyType) {
        //域控策略删除
        await delDomain({ id_string: props.selectedRecord!.join(',') })
      } else {
        //安全防护策略删除
        await delSercuity({ id_string: props.selectedRecord!.join(',') })
      }
      emit('refreshTable')
      //初始化
      initRowSelection()
    }

    // 搜索框变化刷新表格
    function searchData(v, e) {
      const { value } = v.target ?? { value: v }
      if (e && value) {
        emit('refreshTable')
      }
      if (!value && !e) {
        emit('refreshTable')
      }
    }
    return {
      searchValue,
      createStrategy,
      showCheckBox,
      stategyApply,
      isCheckCmp,
      delStrategy,
      searchData,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  .headerL {
    font-weight: 700;
    font-size: 16px;
  }
  .headerR {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .search {
      margin-right: 16px;
    }
    ::v-deep(.remdel) {
      margin-right: 0;
    }
    .createStr {
      margin-left: 16px;
    }
  }
}
.actived {
  background: #eee;
}
</style>
