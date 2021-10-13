<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    @visibleChange="visibleChange"
    overlayClassName="batchM"
  >
    <template #content>
      <div class="container">
        <div
          class="nodes"
          @click="useCheckBox('move')"
          :class="{ actived: boxType == 'move' }"
        >
          {{ t('asset.moveGroup') }}
        </div>
        <div class="line"></div>
        <div
          class="nodes"
          @click="useCheckBox('del')"
          :class="{ actived: boxType == 'del' }"
        >
          {{ t('asset.delHost') }}
        </div>
      </div>
    </template>
    <a-button type="link" :class="{ remdelactived: boxType || showPop }">
      <template #icon>
        <CarryOutOutlined />
      </template>
      <slot />
    </a-button>
  </a-popover>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { Popover } from 'ant-design-vue'
import { CarryOutOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Popover.name]: Popover,
    CarryOutOutlined
  },
  props: {
    boxType: String,
    isCheck: Boolean,
    //哪些key在等于谁的情况下 disable
    disKey: {
      type: Object as PropType<{ disabled_keys: { key: string; value: any }[] }>
    }
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const showPop = ref<boolean>(false)
    //pop visibleChange
    const visibleChange = (b) => {
      showPop.value = b
    }

    //del or move
    const useCheckBox = async (type) => {
      if (type === 'del') {
        //更新disKey
        await emit('update:disKey', {
          disabled_keys: [{ key: 'online', value: true }]
        })
      } else {
        await emit('update:disKey', { disabled_keys: [] })
      }
      //
      if (type === props.boxType) {
        emit('update:isCheck', false)
        emit('update:boxType', '')
      } else {
        emit('update:isCheck', true)
        emit('update:boxType', type)
      }
      //刷新 重绘
      emit('refreshTable')
    }
    return {
      visibleChange,
      showPop,
      useCheckBox,
      t
    }
  }
})
</script>
<style lang="less">
.batchM {
  width: 200px;
  .ant-popover-inner-content {
    padding: 0;
  }
  .container {
    padding: 8px 0;
    .line {
      width: 200px;
      height: 1px;
      background: #eeeeee;
      border-radius: 8px;
      margin: 8px 0;
    }
    .actived {
      background: #eee !important;
    }
    .nodes {
      padding: 0 16px;
      line-height: 40px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
.remdelactived {
  background: #eee !important;
}
</style>
