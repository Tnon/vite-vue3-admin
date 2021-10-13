<template>
  <div class="box">
    <template v-for="(value, key, index) in filterData" :key="key">
      <div class="ffnodes">
        <template v-for="(item, index) in value" :key="item.title">
          <div
            class="nodes"
            :class="{ actived: $props[key] == item.key }"
            @click="selectType(key, item.key)"
          >
            <div class="title">{{ t(item.title) }}</div>
            <div :class="item.class ?? ''" class="value">
              {{ counts[item.countKey] }}
            </div>
          </div>
          <div
            class="lines"
            v-if="(key == 'secure_status' && index < 2) || index < 1"
          />
        </template>
      </div>
      <div class="lineb" v-if="index < 2"></div>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, watchEffect } from 'vue'
import { filterDType, FProps } from './type'
import { getStatistics } from '@/api/asset/host'
import { useI18n } from 'vue-i18n'
const filterData: filterDType = {
  secure_status: [
    {
      //健康
      title: 'common.healthy',
      class: 'healty',
      key: '0',
      countKey: 'healthy_count'
    },
    {
      //受攻击
      title: 'common.attacked',
      class: 'attacked',
      key: '1',
      countKey: 'attacked_count'
    },
    {
      //存在风险
      title: 'common.atRisk',
      class: 'risked',
      key: '2',
      countKey: 'risk_count'
    }
  ],
  online: [
    {
      title: 'common.onLine',
      key: '1',
      countKey: 'online_count'
    },
    {
      title: 'common.offLine',
      key: '0',
      countKey: 'offline_count'
    }
  ],
  osver: [
    {
      title: 'common.windows',
      key: '1',
      countKey: 'windows_count'
    },
    {
      title: 'common.linux',
      key: '0',
      countKey: 'linux_count'
    }
  ]
}

export default defineComponent({
  props: {
    secure_status: {
      type: String as PropType<string>
    },
    online: {
      type: String as PropType<string>
    },
    osver: {
      type: String as PropType<string>
    },
    group_id: {
      type: Number as PropType<number>
    }
  },
  setup(props: FProps & { group_id: number }, { emit }) {
    const { t } = useI18n()
    const selectType = (type: string, key: number): void => {
      emit('update:' + type, props[type] === key ? '' : key)
    }
    const counts = reactive({
      attacked_count: 0,
      healthy_count: 0,
      linux_count: 0,
      offline_count: 0,
      online_count: 0,
      risk_count: 0,
      total: 0,
      windows_count: 0
    })
    const getStatic = async (params: { group_id: number }) => {
      const countStatic = await getStatistics(params)
      Object.assign(counts, { ...countStatic })
    }

    // watchEffect(() => {
    //   getStatic({ group_id: props.group_id })
    // })
    getStatic({ group_id: props.group_id })
    return {
      counts,
      filterData,
      selectType,
      getStatic,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.box {
  padding: 0 24px;
  display: flex;
  align-items: center;
  .lineb {
    width: 1px;
    height: 24px;
    background: #eeeeee;
    margin: 0 8px;
  }
  .ffnodes {
    background: #fff;
    border-radius: 8px;
    border: 1px solid #eeeeee;
    padding: 4px;
    display: flex;
    align-items: center;
    .lines {
      width: 1px;
      height: 24px;
      background: #eeeeee;
      margin: 0 4px;
    }
    .actived {
      background: #eee;
      border-radius: 8px;
    }
    .nodes {
      width: 96px;
      height: 56px;
      padding: 8px 12px;
      cursor: pointer;
      .title {
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 2px;
      }
      .value {
        font-size: 14px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.85);
      }
      .healty {
        color: #18ba79;
        cursor: pointer;
      }
      .attacked {
        color: #f05064;
      }
      .risked {
        color: #f8a454;
      }
    }
  }
}
</style>
