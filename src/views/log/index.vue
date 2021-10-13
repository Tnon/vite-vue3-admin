<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-14 20:42:01
 * @LastEditTime: 2021-10-08 14:37:25
-->
<template>
  <div class="boxconNt">
    <!-- 头部tab start -->
    <div class="header">
      <switchNodes :types="types" v-model:actived="fType" size="small" />
      <div class="tips" v-if="tipsVisiable">
        <span>
          <span><custom-icon color="#ffd77a" type="#ax-tips" /></span>
          <span v-if="logValue">
            {{ t('log.logTipsP', [logValue]) }}
          </span>
          <span v-else> {{ t('log.logTipsNone') }}</span>
          <span class="cusIcon setting" @click="goSetting">
            {{ t('log.logTipsN') }}
          </span>
        </span>
        <custom-icon
          class="cusIcon"
          @click="tipsVisiable = false"
          type="#ax-close"
        />
      </div>
    </div>
    <!-- 头部tab end -->

    <!-- 内容 start -->
    <router-view v-slot="{ Component }">
      <transition name="zoom-fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- 内容 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref } from 'vue'
import switchNodes from '@/components/switchNodes'
import { useRoute, useRouter } from 'vue-router'
import { types } from './type'
import { getLogStorageApi } from '@/api/setting/server'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'logIndex',
  components: {
    switchNodes
  },
  setup() {
    const { t } = useI18n()
    const logValue = ref<number>(12)
    const tipsVisiable = ref<boolean>(true)
    const router = useRouter()
    const currentRoute = useRoute()
    const state = reactive<{
      fType: string
    }>({
      fType: currentRoute.meta.type as string
    })
    watch(
      () => state.fType,
      (v) => {
        router.push({ name: 'log-' + v })
      }
    )
    const goSetting = () => {
      router.push({ name: 'setting-server-storage' })
    }
    // 获取日志存储限制
    const getLogStorage = async () => {
      const { log_expire } = await getLogStorageApi()
      logValue.value = log_expire
      // tipsVisiable.value = !!unref(logValue)
    }
    getLogStorage()
    return {
      ...toRefs(state),
      types,
      tipsVisiable,
      goSetting,
      logValue,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .tips {
    flex: 1;
    border-radius: 8px;
    font-size: 14px;
    border: 1px solid #ffd77a;
    background-color: #fff9e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    margin: 0 32px 0 16px;
    .cusIcon {
      cursor: pointer;
    }
    .setting {
      color: #19be6b;
    }
  }
}
</style>
