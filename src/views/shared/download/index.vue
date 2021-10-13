<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-23 10:30:36
 * @LastEditTime: 2021-10-13 11:27:38
-->
<template>
  <router-view v-slot="{ Component }">
    <transition name="zoom-fade" mode="out-in" appear>
      <div class="box">
        <div class="bg"></div>
        <div class="container bk_br_sd">
          <div class="content">
            <template v-for="item in agentDownload" :key="item">
              <div class="agent">
                <!-- agent客户端下载 -->
                <div class="title">
                  <span class="line"></span>
                  <span>{{ t('download.agtDown', [item]) }}</span>
                </div>

                <!-- windows版/linux版 -->
                <client
                  :formData="state[item]"
                  :osType="item"
                  :isShow="false"
                />

                <!-- 安装说明 -->
                <div class="title">
                  <span class="line"></span>
                  <span>{{ t('download.instInst') }}</span>
                </div>
                <time-line
                  :osType="item"
                  :downLoadUrl="state[item].download_url"
                  :agent_filename="state[item].agent_filename"
                  :ip="state[item].ip"
                  :port="state[item].port"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import timeLine from './timeLine/index.vue'
import client from './client/index.vue'
import { getPkgVer } from '@/api/setting/agent'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    timeLine,
    client
  },
  setup() {
    const { t } = useI18n()
    const agentDownload = ['Windows', 'Linux']
    //版本信息
    const state = reactive<{ Windows: any; Linux: any }>({
      Windows: {},
      Linux: {}
    })

    //获取版本信息
    const getPackageVersions = async () => {
      const { windows, linux } = await getPkgVer()
      state.Windows = windows ?? {}
      state.Linux = linux ?? {}
    }
    getPackageVersions()
    return {
      state,
      agentDownload,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.box {
  min-width: 1080px;
}
.bg {
  height: 260px;
  background: url('@/assets/images/topbanner-Agentdownload.png') no-repeat
    center;
  background-size: contain;
  background-color: #0d1611;
}
.container {
  width: 1280px;
  margin: 24px auto;
  overflow: auto;
  height: calc(100vh - 308px);
  .content {
    padding: 24px 0;
    display: flex;
    .agent {
      width: 50%;
      border-right: 1px solid #eee;
      padding: 0 40px;
      box-sizing: border-box;
      .title {
        font-size: 16px;
        font-weight: 600;
        .line {
          width: 4px;
          height: 16px;
          display: inline-block;
          background: #18ba79;
          border-radius: 8px;
          margin-right: 16px;
        }
      }
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
