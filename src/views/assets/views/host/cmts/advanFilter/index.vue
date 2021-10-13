<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    @visibleChange="visibleChange"
    overlayClassName="advanF"
    destroyTooltipOnHide
    :visible="showPop"
  >
    <template #content>
      <div class="title">{{ t('asset.basFilter') }}</div>
      <div class="formitem">
        <template v-for="(item, index) in formItems" :key="item.key">
          <div class="items">
            <div class="label">{{ t(item.label) }}</div>
            <switch-nodes
              size="small"
              v-model:actived="state[item.key].value"
              :types="item.filters"
              :style="{ padding: '4px 10px' }"
            />
          </div>
        </template>
      </div>
      <div class="title">{{ t('asset.expFilter') }}</div>
      <div class="formitem">
        <div class="items">
          <div class="label">{{ t('common.group') }}</div>

          <select-tree
            class="selecTree"
            :dataSource="treeData"
            v-model:selectedKeys="swtGroups"
            :placeholder="t('common.selectGroup')"
            multiple
          />
        </div>
        <div class="items">
          <div class="label">{{ t('common.tag') }}</div>
          <a-input-search
            style="flex: 1"
            :placeholder="t('common.tagPlace')"
            v-model:value.trim="tagsSelf"
            @change="onSearch"
            @search="onSearch"
          />
        </div>
        <div class="items">
          <div class="label">{{ t('common.offLineTime') }}</div>
          <a-range-picker
            style="flex: 1"
            v-model:value="swtDataRange"
            show-time
            :format="dateFormat"
          />
        </div>
      </div>
      <div class="line"></div>
      <div class="formitem">
        <div class="items jbtn">
          <div class="label">
            {{ t('asset.showBasic') + t('asset.basFilter') }}
          </div>
          <a-switch v-model:checked="checked" />
        </div>
      </div>
    </template>
    <a-button type="link" :class="{ filteractived: showPop }">
      <template #icon>
        <customIcon type="#ax-fileter" class="btnIcon" />
      </template>
      <slot />
    </a-button>
  </a-popover>
</template>
<script lang="ts">
import switchNodes from '@/components/switchNodes'
import { defineComponent, PropType, computed, ref } from 'vue'
import { Popover, DatePicker, Switch } from 'ant-design-vue'
import selectTree from '@/components/selectTree'
import { formItems, ADprops } from './index'
import { getHostGroups } from '@/api/asset/host'
import { useI18n } from 'vue-i18n'
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
    groups: {
      type: String
    },
    group: {
      type: Number as PropType<number>
    },
    update_time: {
      type: String
    },
    swtchecked: {
      type: Boolean
    },
    tags: {
      type: String
    }
  },
  components: {
    [Popover.name]: Popover,
    switchNodes,
    [Switch.name]: Switch,
    selectTree,
    [DatePicker.RangePicker.name]: DatePicker.RangePicker
  },
  setup(props: ADprops, { emit }) {
    const { t } = useI18n()
    //树的数据（分组）
    let treeData: any = ref<any>()
    // = computed(() => store.getters['hostGroup/hostGroupGetr'])

    //手动控制popover
    const showPop = ref<boolean>(false)
    const visibleChange = async (b) => {
      if (b) {
        const { groups } = await getHostGroups(props.group)
        treeData.value = groups
      }
      showPop.value = b
    }
    //中介可以用对象。此处用的栈存储
    //状态中介
    const swtStatus = computed({
      get: () => props.secure_status,
      set: (val) => emit('update:secure_status', val)
    })
    //在线中介
    const swtOnline = computed({
      get: () => props.online,
      set: (val) => emit('update:online', val)
    })
    //系统中介
    const swtSystem = computed({
      get: () => props.osver,
      set: (val) => emit('update:osver', val)
    })
    //分组中介
    const swtGroups = computed({
      get: () => props.groups,
      set: (val) => emit('update:groups', val)
    })
    //离线时间中介
    const dateFormat = 'YYYY-MM-DD HH:mm:ss'
    const swtDataRange = computed({
      get: () => props.update_time.split(','),
      set: (val) => {
        const [start, end] = val as any
        const daterange = val.length
          ? [start.format(dateFormat), end.format(dateFormat)]
          : []
        emit('update:update_time', daterange.join(','))
      }
    })

    //是否展示基础筛选
    const checked = computed({
      get: () => props.swtchecked,
      set: (val) => emit('update:swtchecked', val)
    })
    //标签单独
    const tagsSelf = ref<string>('')
    const onSearch = (v, e) => {
      const { value } = v.target ?? { value: v }
      if (e && value) {
        emit('update:tags', value.split('/').join(','))
      }
      if (!value && !e) {
        emit('update:tags', value)
      }
    }
    return {
      formItems,
      treeData,
      swtGroups,
      swtDataRange,
      tagsSelf,
      state: { swtStatus, swtOnline, swtSystem },
      dateFormat,
      checked,
      showPop,
      visibleChange,
      onSearch,
      t
    }
  }
})
</script>
<style lang="less">
.advanF {
  .ant-popover-inner {
    padding: 8px 0;
  }
  .ant-popover-inner-content {
    padding: 0;
  }
  .line {
    width: 500px;
    height: 1px;
    background: #eee;
    border-radius: 8px;
    margin: 16px 0 8px 0;
  }

  width: 500px;
  .title {
    height: 36px;
    line-height: 36px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .label {
    min-width: 100px;
  }
  .items {
    height: 40px;
    display: flex;
    align-items: center;
    margin: 4px 0;
  }
  .jbtn {
    justify-content: space-between;
  }
  .formitem {
    padding: 0 16px;
  }
}

.filteractived {
  background: #eee !important;
}
.btnIcon {
  margin-right: 8px;
}
</style>
