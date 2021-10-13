<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-12 19:31:18
 * @LastEditTime: 2021-09-01 10:09:22
-->
<template>
  <div class="uptab">
    <div class="upload">
      <!-- 头部 start -->
      <div class="header">
        <span class="title">{{ t('setting.uplAnIns') }}</span>
        <!-- 工具栏 start-->
        <toolsBar />
        <!-- 工具栏 end-->
      </div>
      <!-- 头部 end -->

      <!-- 上传 start -->
      <a-row :gutter="16" class="rowpad">
        <template v-for="(item, key) in osType" :key="key">
          <a-col span="12">
            <!-- 上传agent组件 start -->
            <upload-agent
              :placeHolder="t('setting.pupAgt', [key])"
              :packageMsg="osType[key]"
              :osver="key"
              @refreshCmt="refreshCmt"
            >
              <template #text>
                <div class="uptitle">
                  {{ item.product_name }} {{ key }} {{ item.package_version }}
                </div>
                <div class="upversion">
                  <span>Agent: {{ item.agent_version }} </span>
                  <span> - </span>
                  <span>
                    {{ t('setting.driLib') }}:{{ item.driver_version }}
                  </span>
                </div>
              </template>
            </upload-agent>
            <!-- 上传agent组件 end -->
          </a-col>
        </template>
      </a-row>
      <!-- 上传 end -->

      <!--分割线 start -->
      <div class="line" />
      <!--分割线 end -->

      <!-- 切换视图 start -->
      <switch-view v-model:actived="actived" v-model:showDetail="showDetail" />
      <!-- 切换视图 end -->
    </div>

    <!-- agent/驱动管理 start -->
    <component :is="actived" v-if="toogleFlag" :showDetail="showDetail" />
    <!-- agent/驱动管理 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, nextTick } from 'vue'
import { Row, Col } from 'ant-design-vue'
import { toolsBar, switchView } from './components'
import { uploadAgent } from '../components'
import { agent, driver } from './views'
import { OsType, SwiSta, PackageMsg } from './type'
import { getPkgVer } from '@/api/setting/agent'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    toolsBar,
    [Row.name]: Row,
    [Col.name]: Col,
    uploadAgent,
    switchView,
    agent,
    driver
  },
  setup() {
    const { t } = useI18n()
    //标识，刷新组件
    const toogleFlag = ref<boolean>(true)
    //包的信息
    const packageMsg: PackageMsg = {
      //包名
      product_name: '',
      //包版本
      package_version: '',
      // agent版本
      agent_version: '',
      //驱动库版本
      driver_version: '',
      //更新时间
      created_at: '',
      //包大小
      package_size: '',
      //适用系统
      supports: '',
      // 是否可以撤回
      enable_recall: false
    }
    //win和lin的包信息
    const osType = reactive<OsType>({
      Windows: Object.assign({}, packageMsg),
      Linux: Object.assign({}, packageMsg)
    })
    //获取版本信息
    const getPackageVersions = async () => {
      const { windows, linux } = await getPkgVer()
      osType.Windows = windows ?? {}
      osType.Linux = linux ?? {}
    }
    getPackageVersions()

    //视图切换 agent/driver
    const swtState = reactive<SwiSta>({
      actived: 'agent',
      showDetail: true
    })
    //刷新组件
    const refreshCmt = (v) => {
      toogleFlag.value = false
      nextTick(() => {
        toogleFlag.value = true
      })
      if (v) {
        getPackageVersions()
      }
    }
    return {
      ...toRefs(swtState),
      osType,
      refreshCmt,
      toogleFlag,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.uptab {
  margin-left: 16px;
  .upload {
    overflow: hidden;
    background: #fff;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    .header {
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0 0 24px;
      .title {
        font-size: 16px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.85);
        line-height: 24px;
      }
    }

    .uptitle {
      font-size: 14px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 20px;
      margin-bottom: 4px;
    }
    .upversion {
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      line-height: 20px;
    }
    .rowpad {
      padding: 8px 16px;
    }
  }
  .line {
    height: 1px;
    background: #eeeeee;
    margin: 8px 16px 0px 16px;
  }
}
</style>
