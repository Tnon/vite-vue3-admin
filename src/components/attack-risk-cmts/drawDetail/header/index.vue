<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-05 15:21:08
 * @LastEditTime: 2021-10-11 20:15:25
-->
<template>
  <div class="header">
    <!-- 危险等级 start -->
    <danger-level :level="level" />
    <!-- 危险等级 end -->
    <div class="riOp">
      <!-- 拦截和处理 start -->
      <div class="txt-hand">
        <span class="label">{{ t(`arcomn.${text}`) }}</span>
        <div class="tools">
          <hand-tool
            v-if="handle === 0"
            :host_id="host_id"
            :content_md5="content_md5"
            :dtype="dtype"
            :reload="reload"
            :description="description"
            :osver="osver"
            @changeHandle="changeHandle"
            :handled="handledCmp"
            :isCheck="isCheck"
          />
        </div>
      </div>
      <!-- 拦截和处理 end -->

      <!-- 标签 start -->
      <div class="tags">
        <span class="tag primary" v-for="item in tags">{{ item }}</span>
        <!-- <span class="tag color">#5884DE</span> -->
      </div>
      <!-- 标签 end -->
    </div>
  </div>
  <!-- 特征和辅助分析 start -->
  <div class="details">
    <div class="label">
      {{ modelType === 1 ? t('arcomn.attChar') : t('arcomn.riskBeha') }}
    </div>
    <div class="msg">{{ description }}</div>
    <div v-if="modelType === 1">
      <div class="label">{{ t('arcomn.auxAnaly') }}</div>
      <div class="msg">{{ comment }}</div>
    </div>
    <div v-else>
      <div class="label">{{ t('arcomn.riskOvw') }}</div>
      <div class="msg">{{ overview }}</div>
      <div class="label">{{ t('arcomn.repairSuggest') }}</div>
      <div class="msg">{{ suggestion }}</div>
    </div>
  </div>
  <!-- 特征和辅助分析 end -->
</template>
<script lang="ts">
import { handTool } from '@/components/attack-risk-cmts'
import { computed, defineComponent, PropType, ref } from 'vue'
import { dangerLevel } from './cmts/dangerLevel'
import { PrinterOutlined } from '@ant-design/icons-vue'
import { Tag } from 'ant-design-vue'
import { Pstatus } from '@/enums/pstatus'
import store from '@/store'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    dangerLevel,
    PrinterOutlined,
    handTool,
    [Tag.name]: Tag
  },
  props: {
    level: String,
    host_id: String,
    handled: Number,
    dtype: Number,
    description: String,
    content_md5: String,
    reload: Function,
    comment: String,
    tags: Array as PropType<string[]>,
    osver: String,
    handle: Number,
    modelType: Number,
    suggestion: String,
    overview: String
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    //加黑加白disable
    const handledCmp = computed({
      get: () => props.handled,
      set: (val) => emit('update:handled', val)
    })
    //处理状态
    let text = ref('')
    switch (props.handled) {
      case 0:
        text.value = Pstatus['UNHANDLE']
        break
      case 1:
        text.value = Pstatus['WHITE']
        break
      case 2:
        text.value = Pstatus['BLACK']
        break
      case 3:
        text.value = Pstatus['LANJIE']
        break
      case 5:
        text.value = Pstatus['SBAO']
        break
      default:
        text.value = Pstatus['CLEAR']
        break
    }
    //加黑加白更新状态，props游离，死区
    const changeHandle = (type) => {
      text.value = !!type ? Pstatus['BLACK'] : Pstatus['WHITE']
      handledCmp.value = !!type ? 2 : 1
    }
    //开启选择时候，不让手动处理(在父组件取值，优化表格性能)
    const isCheck = computed(() => store.state['selectAll'].isCheck)
    return {
      text,
      changeHandle,
      handledCmp,
      isCheck,
      t
    }
  }
})
</script>
<style lang="scss" scoped>
.header {
  height: 104px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  .riOp {
    flex: 1;
    .txt-hand {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      .label {
        font-size: 16px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .tags {
      .tag {
        padding: 2px 8px;
        font-size: 12px;
        font-weight: 400;
        border-radius: 2px;
        margin-right: 4px;
      }
      .primary {
        background: #eeeeee;
        color: rgba(0, 0, 0, 0.6);
      }
      .color {
        background: rgba(88, 132, 222, 0.15);
        color: #5884de;
      }
    }
  }
}
.details {
  padding-top: 24px;
  border-bottom: 1px solid #eee;
  .msg {
    margin-bottom: 24px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    word-break: break-all;
  }
  .label {
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 8px;
  }
}
</style>
