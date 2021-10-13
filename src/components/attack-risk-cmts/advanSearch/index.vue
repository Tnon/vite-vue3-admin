<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlayClassName="advanCard"
    destroyTooltipOnHide
  >
    <template #content>
      <!-- 处理状态 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.handleStatus') }}</div>
        <a-tree-select
          style="flex: 1"
          treeNodeFilterProp="title"
          :replaceFields="replaceFields"
          v-model:value="modelValue"
          :tree-data="statusData"
          :tree-checkable="true"
          allow-clear
          :placeholder="t('common.allPlace')"
        />
      </div>
      <!-- 处理状态 end -->

      <!-- 攻击源 start -->
      <div class="cols">
        <div class="label">
          {{
            modelType === MODELTYPE.ATTACK
              ? t('arcomn.attackSrc')
              : t('arcomn.riskSrc')
          }}
        </div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="
            modelType === MODELTYPE.ATTACK
              ? t('arcomn.attSrcPlace')
              : t('arcomn.riskSrcPlace')
          "
          v-model:value="risksrclist"
        />
      </div>
      <!-- 攻击源 end -->

      <!-- 影响主机 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.impactHost') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('arcomn.ipPlace')"
          v-model:value="iplist"
        />
      </div>
      <!-- 影响主机 end -->

      <!-- 分组 start -->
      <div class="cols">
        <div class="label">{{ t('common.group') }}</div>
        <select-tree
          class="selecTree"
          :dataSource="treeGroup"
          v-model:selectedKeys="grouplist"
          multiple
        />
      </div>
      <!-- 分组 end -->

      <!-- 标签 start -->
      <div class="cols">
        <div class="label">{{ t('common.tag') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('common.tagPlace')"
          v-model:value="taglist"
        />
      </div>
      <!-- 标签 end -->

      <!-- 时间 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.dateRange') }}</div>
        <a-range-picker
          style="width: 100%"
          v-model:value="daterange"
          show-time
          @change="ok"
          :format="dateFormat"
        />
      </div>
      <!-- 时间 end -->
      <!-- 确定和重置 start -->
      <div class="footer">
        <a-button class="confirm" @click="confirm" type="primary">
          {{ t('common.confirm') }}
        </a-button>
        <a-button class="reset" @click="cancle">
          {{ t('common.reset') }}
        </a-button>
      </div>
      <!-- 确定和重置 end -->
    </template>
    <a-button class="filter" type="link">
      <template #icon>
        <customIcon type="#ax-fileter" class="btnIcon" />
      </template>
      {{ t('common.filter') }}
      <span class="flag" v-if="effectFlag" />
    </a-button>
  </a-popover>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'
import selectTree from '@/components/selectTree'
import { Popover, DatePicker, Input, TreeSelect } from 'ant-design-vue'
import { statusData } from './datasource'
import { Moment } from 'moment'
import { MODELTYPE } from '@/enums/attack_risk'
import { useGroupTree } from '@/hooks'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    modelType: Number
  },
  components: {
    [DatePicker.RangePicker.name]: DatePicker.RangePicker,
    selectTree,
    [Popover.name]: Popover,
    [Input.TextArea.name]: Input.TextArea,
    [TreeSelect.name]: TreeSelect
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    //获取分组
    const treeGroup = useGroupTree('all')

    //时间格式
    const dateFormat = 'YYYY-MM-DD HH:mm:ss'
    const modelValue = computed({
      get: () => (agus.handledlist ? agus.handledlist.split(',') : []),
      set: (val) => {
        agus.handledlist = val.join(',')
      }
    })
    //数据仓
    const agus = reactive<any>({
      //处理状态
      handledlist: '',
      //攻击源
      risksrclist: '',
      //影响主机
      iplist: '',
      //所属分组
      grouplist: '',
      //标签
      taglist: '',
      //时间范围
      daterange: ''
    })
    //时间范围
    const daterange = ref<Moment[]>([])
    //时间确定按钮
    const ok = (v) => {
      if (v.length) {
        const [start, end] = v
        agus.daterange = start.format(dateFormat) + ',' + end.format(dateFormat)
      } else {
        agus.daterange = ''
      }
    }
    //flag 标记是否筛选了
    const effectFlag = ref<boolean>(false)
    //派发确定事件
    const confirm = () => {
      let flag = ''
      const sendStateObj = Object.assign({}, agus, {
        risksrclist: agus.risksrclist.replaceAll('/', ','),
        iplist: agus.iplist.replaceAll('/', ','),
        taglist: agus.taglist.replaceAll('/', ',')
      })
      for (let k in sendStateObj) {
        flag += sendStateObj[k]
      }
      effectFlag.value = !!flag
      emit('confirm', sendStateObj)
    }
    //重置init
    const cancle = () => {
      for (let k in agus) {
        agus[k] = ''
      }
      daterange.value = []
      effectFlag.value = false
      emit('confirm', agus)
    }
    //处理状态的field
    const replaceFields = {
      children: 'items',
      title: 'name',
      key: 'id',
      value: 'id'
    }
    return {
      ...toRefs(agus),
      dateFormat,
      daterange,
      ok,
      statusData,
      confirm,
      cancle,
      treeGroup,
      MODELTYPE,
      replaceFields,
      modelValue,
      effectFlag,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.cols {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  .ant-calendar-picker {
    flex: 1;
  }
  .label {
    width: 100px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
  }
  .selecTree {
    flex: 1;
    position: relative;
    border-radius: 8px;
  }
}
.filter {
  position: relative;
  .flag {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    right: 2px;
    background: #18ba79;
  }
}
.footer {
  display: flex;
  margin-top: 24px;
  .confirm {
    flex: 1;
  }
  .reset {
    margin-left: 16px;
  }
}
.btnIcon {
  margin-right: 8px;
}
</style>
