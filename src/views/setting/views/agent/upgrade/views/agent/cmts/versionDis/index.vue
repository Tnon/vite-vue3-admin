<template>
  <div :class="[showDetail ? 'visible' : 'hidden']" class="contbox">
    <!-- agent头部 start -->
    <div class="header">
      <span class="title">{{ t('setting.verDis') }}</span>
      <switch-nodes
        :types="types"
        v-model:actived="sysType"
        :style="{ padding: '4px 12px' }"
      />
    </div>
    <!-- agent头部 end -->

    <a-row :gutter="16" class="versionType">
      <template v-for="(item, index) in versionType" :key="item.color">
        <a-col span="6">
          <!-- 版本统计节点 start -->
          <div class="versionItem">
            <div class="versionTitle">
              <span class="title">
                {{
                  item.version_name === '-' || !item.version_name
                    ? t('setting.noOthVer')
                    : item.version_name
                }}
              </span>
              <span
                class="sign"
                v-if="
                  item.sign && item.version_name && item.version_name !== '-'
                "
              >
                {{ item.sign }}
              </span>
            </div>
            <div class="versionNum">
              <span class="percentage" :style="{ color: item.color }">
                {{ item.percent }}
              </span>
              <span class="num">
                {{ item.hosts }}{{ t('setting.agtUil') }}
              </span>
            </div>
            <a-progress
              :percent="Number(item.percent.slice(0, item.percent.length - 1))"
              size="small"
              :stroke-color="item.color"
              :showInfo="false"
            />
          </div>
          <!-- 版本统计节点 end -->
        </a-col>
      </template>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import switchNodes from '@/components/switchNodes'
import { Row, Col, Progress } from 'ant-design-vue'
import { getAgentVerList } from '@/api/setting/agent'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    switchNodes,
    [Row.name]: Row,
    [Col.name]: Col,
    [Progress.name]: Progress
  },
  props: {
    showDetail: Boolean
  },
  setup() {
    const { t } = useI18n()
    const sysType = ref<string>('1')
    const types: Items[] = [
      {
        title: 'common.windows',
        type: '1'
      },
      {
        title: 'common.linux',
        type: '0'
      }
    ]
    const versionType = ref<VersionNodes[]>([
      {
        version_name: '',
        percent: '',
        hosts: 0,
        sign: t('setting.upgdVer'),
        color: '#18BA79'
      },
      {
        version_name: '',
        percent: '',
        hosts: 0,
        color: '#5884DE'
      },
      {
        version_name: '',
        percent: '',
        hosts: 0,
        color: '#8C58E8'
      },
      {
        version_name: '',
        percent: '',
        hosts: 0,
        color: '#F0DA5A'
      }
    ])
    const getVersions = async (osver) => {
      const res = await getAgentVerList({ osver })
      res.forEach((ele, index) => {
        Object.assign(versionType.value[index], ele)
      })
    }
    watchEffect(() => {
      getVersions(sysType.value)
    })
    return {
      sysType,
      types,
      versionType,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.contbox {
  overflow: hidden;
  transition: all 0.3s;
}
.visible {
  height: 190px;
}
.hidden {
  height: 0;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 0 24px;
  .title {
    line-height: 24px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
}
.versionType {
  padding: 16px 24px;
  .versionItem {
    padding: 16px;
    height: 108px;
    background: #ffffff;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    .versionTitle {
      height: 22px;
      .title {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        line-height: 20px;
      }
      .sign {
        display: inline-block;
        text-align: center;
        width: 64px;
        height: 24px;
        background: rgba(24, 186, 121, 0.15);
        border-radius: 2px;
        color: #18ba79;
        line-height: 24px;
        font-size: 12px;
        margin-left: 10px;
      }
    }
    .versionNum {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      margin-top: 16px;
      .percentage {
        font-size: 16px;
        color: #18ba79;
        line-height: 24px;
      }
      .num {
        color: rgba(0, 0, 0, 0.85);
        line-height: 20px;
      }
    }
  }
}
</style>
