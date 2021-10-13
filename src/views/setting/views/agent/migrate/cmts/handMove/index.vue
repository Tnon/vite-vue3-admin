<template>
  <div>
    <a-button
      disabled
      shape="circle"
      size="small"
      v-if="migrate_status === '0' || !migrate_status || migrate_status === '6'"
      class="disBtn"
    >
      <CheckOutlined />
    </a-button>
    <a-popconfirm
      v-else
      :title="t('setting.migSure')"
      :ok-text="t('common.confirm')"
      :cancel-text="t('common.cancle')"
      @confirm="handMove"
      placement="left"
    >
      <a-button type="primary" shape="circle" size="small">
        <CheckOutlined />
      </a-button>
    </a-popconfirm>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Popconfirm, Button } from 'ant-design-vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import { migrateSingHost } from '@/api/setting/agent'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    migrate_status: String,
    host_id: String,
    reload: Function
  },
  components: {
    [Popconfirm.name]: Popconfirm,
    [Button.name]: Button,
    CheckOutlined
  },
  setup(props) {
    const { t } = useI18n()
    const handMove = async (e) => {
      const { code } = await migrateSingHost({ host_id: props.host_id! })
      if (!code) {
        props.reload!()
      }
    }
    return {
      handMove,
      t
    }
  }
})
</script>

<style lang="less" scoped>
::v-deep(.ant-btn) {
  width: 16px;
  height: 16px;
  min-width: 16px;
  font-size: 10px;
  text-align: center;
  line-height: 16px;
}
.disBtn {
  border: none;
  color: #fff;
  background-color: #eee;
}
</style>
