<template>
  <div class="safetyAlert">
    <span class="title">
      <SoundOutlined style="color: red" />
      {{ t('asset.safeRemin') }}
    </span>
    <div
      class="alertBar"
      @click="jumpTo('attack')"
      :class="~~attacked_count ? 'error' : 'healty'"
    >
      <span v-if="~~attacked_count">
        <!-- 发现 {{ attacked_count }} 个待处理攻击，请尽快前往“攻击”模块处理 -->
        {{
          t('asset.safeAlerm', [
            attacked_count,
            t('asset.atkUnit'),
            t('menu.attack')
          ])
        }}
      </span>
      <span v-else>{{ t('asset.notAtta') }}</span>
      <RightOutlined class="ricon" />
    </div>
    <div
      class="alertBar"
      @click="jumpTo('risk')"
      :class="~~risk_count ? 'warning' : 'healty'"
    >
      <span v-if="~~risk_count">
        <!-- 发现 {{ risk_count }} 个待处理风险，请尽快前往“风险”模块处理 -->
        {{
          t('asset.safeAlerm', [risk_count, t('asset.rskUnit'), t('menu.risk')])
        }}
      </span>
      <span v-else>{{ t('asset.notRisk') }}</span>
      <RightOutlined class="ricon" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RightOutlined, SoundOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    RightOutlined,
    SoundOutlined
  },
  props: {
    safetyStatus: {
      type: Object as PropType<{ attacked_count: number; risk_count: number }>,
      required: true
    },
    host_ip: String
  },
  setup({ safetyStatus, host_ip }) {
    const { t } = useI18n()
    const router = useRouter()
    const jumpTo = (type) => {
      router.push({
        path: '/' + type,
        query: {
          ip: host_ip
        }
      })
    }
    return {
      jumpTo,
      attacked_count: safetyStatus.attacked_count,
      risk_count: safetyStatus.risk_count,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.safetyAlert {
  margin: 16px 24px;
  flex: 1;
  height: 56px;
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    min-width: 130px;
    margin: 0 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
  }
  .alertBar {
    height: 32px;
    border-radius: 8px;
    flex: 14;
    display: flex;
    justify-content: space-between;
    padding: 0 15px 0 20px;
    align-items: center;
    margin-right: 15px;
    cursor: pointer;
    .ricon {
      transition: all 0.3s;
      margin-right: 0;
    }
    &:hover {
      .ricon {
        margin-right: -5px;
      }
    }
  }
  .error {
    background: #fde6e5;
    color: #f05064;
  }
  .healty {
    background: #acecd2;
    color: #40d69a;
  }
  .warning {
    background: #fdf1e4;
    color: #f8a454;
  }
}
</style>
