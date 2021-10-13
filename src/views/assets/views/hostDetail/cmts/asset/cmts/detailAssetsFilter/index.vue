<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-06 14:18:14
 * @LastEditTime: 2021-10-12 16:45:10
-->
<template>
  <div class="container">
    <template v-for="(item, key) in filterTitle" :key="key">
      <div class="cardFilter" @click="toggleFilter(key)">
        <div class="line" :class="{ active: actived == key }"></div>
        <div class="content">
          <div class="value">{{ item }}</div>
          <div class="num">{{ filterValue[`${key}_count`] }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { HostDetailAssetStatic } from '@/api/asset/host'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    actived: String,
    id: String
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    //筛选节点
    const filterTitle = {
      process: t('asset.process'),
      port: t('asset.port'),
      account: t('asset.account'),
      service: t('asset.service'),
      kernel: t('asset.kernel'),
      environment: t('asset.env')
    }
    //节点值仓
    const filterValue = reactive({
      account_count: 0,
      environment_count: 0,
      kernel_count: 0,
      port_count: 0,
      process_count: 0,
      service_count: 0
    })
    //切换节点
    const toggleFilter = (key: string): void => {
      emit('update:actived', key)
    }
    //获取值
    const getStatic = async () => {
      const res = await HostDetailAssetStatic(props.id!)
      for (let k in filterValue) {
        filterValue[k] = res[k]
      }
    }
    getStatic()
    return {
      toggleFilter,
      filterValue,
      filterTitle
    }
  }
})
</script>

<style lang="less" scoped>
.container {
  flex: 1;
  margin: 16px 24px;
  display: flex;
  justify-content: flex-start;
}
.cardFilter {
  padding: 10px;
  width: 128px;
  height: 64px;
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  display: flex;
  justify-content: flex-start;
  margin-right: 10px;
  cursor: pointer;
}
.line {
  width: 6px;
  height: 20px;
  border-radius: 8px;
  margin-right: 8px;
  background: #f8f8f8;
}
.active {
  background: #18ba79;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: -3px;
  .value {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 20px;
  }
  .num {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
  }
}
</style>
