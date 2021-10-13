<template>
  <div>
    <a-popconfirm
      :title="t('arcomn.handleTitle')"
      placement="left"
      @confirm="handle"
      destroyTooltipOnHide
      overlayClassName="popcfmcls"
      :getPopupContainer="getPopupContainer"
    >
      <!-- v-if="handleType !== 1" -->
      <a-button ref="iconClassfirm" type="link" v-if="!isCheck">
        <template #icon><FolderAddOutlined /> </template>
      </a-button>
    </a-popconfirm>
    <a-popover
      v-model:visible="visible"
      placement="left"
      trigger="click"
      destroyTooltipOnHide
      overlayClassName="popNoPad"
      :getPopupContainer="getPopupContainer"
    >
      <template #content>
        <a-popconfirm
          :title="t('arcomn.blackTitle')"
          @confirm="addBlackOrWhite(1)"
          placement="left"
          destroyTooltipOnHide
        >
          <div>
            <a-button class="wbbtn" :disabled="!canHandleBlack" type="link">
              {{ t('arcomn.addBlack') }}
            </a-button>
          </div>
        </a-popconfirm>
        <a-popconfirm
          :title="t('arcomn.whiteTitle')"
          @confirm="addBlackOrWhite(0)"
          placement="left"
          destroyTooltipOnHide
        >
          <div>
            <a-button class="wbbtn" :disabled="!canHandleWhite" type="link">
              {{ t('arcomn.addWhite') }}
            </a-button>
          </div>
        </a-popconfirm>
      </template>
      <a-button ref="iconClass" type="link" @visible="visible = true">
        <template #icon><EllipsisOutlined /></template>
      </a-button>
    </a-popover>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { FolderAddOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
import { Popconfirm, Popover, Button } from 'ant-design-vue'
import { handleAttackRisk, whtblkAttackRisk } from '@/api/attack_risk'
import store from '@/store'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    FolderAddOutlined,
    EllipsisOutlined,
    [Popconfirm.name]: Popconfirm,
    [Popover.name]: Popover,
    [Button.name]: Button
  },
  props: {
    host_id: {
      type: String,
      required: true
    },
    content_md5: {
      type: String,
      required: true
    },
    dtype: {
      type: Number,
      required: true
    },
    reload: Function,
    description: {
      type: String,
      required: true
    },
    osver: {
      type: String,
      required: true
    },
    handled: Number,
    // handleType: Number,
    isCheck: Boolean
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const getPopupContainer = (e) => e.parentNode
    //手动控制加黑加白popover
    const visible = ref<boolean>(false)
    //接收来的刷新方法
    const handle = async () => {
      const { code } = await handleAttackRisk({
        isall: false,
        riskinfolist: [
          {
            host_id: props.host_id,
            content_md5: props.content_md5,
            dtype: props.dtype
          }
        ]
      })
      !code && props.reload!()
      store.commit('globalModal/SetGlobalModal', null)
    }
    const addBlackOrWhite = async (black) => {
      const { code } = await whtblkAttackRisk({
        black,
        riskinfo: {
          host_id: props.host_id,
          content_md5: props.content_md5,
          dtype: props.dtype
        },
        description: props.description,
        osver: props.osver
      })
      !code && props.reload!()
      visible.value = false
      emit('changeHandle', black)
    }
    //是否能加白
    const canHandleWhite = computed(() => {
      //已加白的不能加白
      if (props.handled === 1) {
        return false
      }
      return true
    })

    //是否能加黑
    const canHandleBlack = computed(() => {
      //已加黑的不能加黑
      if (props.handled === 2) {
        return false
      }
      //已拦截不能加黑
      if (props.handled === 3) {
        return false
      }
      //仅上报不能加黑
      if (props.handled === 5) {
        return false
      }
      return true
    })
    return {
      handle,
      visible,
      addBlackOrWhite,
      getPopupContainer,
      canHandleWhite,
      canHandleBlack,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.wbbtn {
  width: 160px;
  height: 40px;
  text-align: left;
  border-radius: 0;
}
</style>
