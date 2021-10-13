<template>
  <div class="download">
    <div v-if="!Object.keys(formData).length" class="empty">
      <FrownOutlined class="empicon" />
      <div class="msg">{{ t('download.noPkgInfo') }}</div>
    </div>
    <div v-else>
      <div class="client">
        <div class="logo">
          <!-- <custom-icon class="cusIcon" :type="osTypeIcon" size="64" /> -->
          <img
            class="cusIcon"
            :src="osType === 'Windows' ? winPkg : linPkg"
            alt=""
          />
          <span class="title">
            {{ formData.product_name }}{{ formData.package_version }}
          </span>
        </div>
        <a-button type="primary" v-if="!isShow">
          <a :href="formData.download_url">
            {{ t('download.downForSys', [osType]) }}
          </a>
        </a-button>
      </div>
      <div class="nodes">
        <span class="label">{{ t('common.agentVersion') + ':' }}</span>
        <span class="value">{{ formData.agent_version }}</span>
      </div>
      <div class="nodes" v-if="isShow">
        <span class="label">{{ t('common.driVer') + ':' }}</span>
        <span class="value">{{ formData.driver_version }}</span>
      </div>
      <div class="nodes">
        <span class="label">{{ t('common.updateTime') + ':' }}</span>
        <span class="value">{{ formData.created_at }}</span>
      </div>
      <div class="nodes">
        <span class="label">{{ t('download.insSize') }}:</span>
        <span class="value">{{ formData.package_size }}</span>
      </div>
      <!-- <div class="nodes">
        <span class="label">适用系统：</span>
        <span class="value">{{ formData.supports }}</span>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import winPkg from '@/assets/images/win_pkg.png'
import linPkg from '@/assets/images/lin_pkg.png'
import { FrownOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    FrownOutlined
  },
  props: {
    osType: {
      type: String
    },
    isShow: {
      type: Boolean,
      default: false
    },
    formData: Object
  },
  setup() {
    const { t } = useI18n()
    return {
      winPkg,
      linPkg,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.download {
  width: 560px;
  background: #f8f8f8;
  padding: 24px;
  border-radius: 8px;
  margin: 16px 0 24px;
  .client {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .logo {
      display: flex;
      align-items: center;
      .cusIcon {
        border-radius: 8px;
        margin-right: 16px;
        width: 64px;
        height: 64px;
      }
    }
  }
  .nodes {
    display: flex;
    margin: 16px 0;
    color: rgba(0, 0, 0, 0.6);
    .label {
      min-width: 110px;
      color: rgba(0, 0, 0, 0.9);
    }
    .value {
      word-break: break-word;
    }
  }
}
.empty {
  height: 194px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .empicon {
    font-size: 32px;
    color: rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
  }
  .msg {
    color: rgba(0, 0, 0, 0.3);
  }
}
</style>
