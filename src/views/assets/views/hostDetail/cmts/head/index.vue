<template>
  <div class="header">
    <!-- 头部 start -->
    <div class="title">
      <LeftOutlined class="back" @click="goBack" />
      <custom-icon size="48" class="cusicon" :type="osLogo" />
      <div class="riOp">
        <div class="riRow">
          <span class="ip">{{ ip }}</span>
          <span class="isOnline offline" v-if="!online">
            <a-badge color="#ddd" />
            {{ t('common.offLine') }}
          </span>
          <span class="isOnline online" v-else>
            <a-badge status="processing" color="#18BA79" />
            {{ t('common.onLine') }}
          </span>
        </div>
        <div class="riRow">
          <span class="host_time">{{ host_name }}</span>
          <span class="host_time" v-if="!online">
            <span> {{ t('common.offLineTime') }}：</span>
            <span>{{ last_offline_at }}</span>
          </span>
        </div>
      </div>
    </div>
    <!-- 头部 end -->

    <!-- 菜单栏开始 -->
    <div class="topMenu">
      <top-menu :menus="routes" mode="horizontal" class="assTopMenu" />
      <a-button type="link" :loading="loading" @click="refresh" class="">
        {{ t('asset.updataNow') }}
      </a-button>
    </div>
    <!-- 菜单栏结束 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { Badge } from 'ant-design-vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import routes from '@/router/modules/assets/hostDetail/index'
import TopMenu from '@/setLayout/menu.vue'
import { useRouter } from 'vue-router'
import { hostDetailHead } from '@/api/asset/host'
import { hostDetai } from './index'
import { osLogoType } from '@/utils/tools'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    id: String,
    host_ip: String
  },
  components: {
    LeftOutlined,
    TopMenu,
    [Badge.name]: Badge
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const osLogo = ref<string>('')

    // 路由跳转
    const router = useRouter()
    const goBack = () => {
      router.go(-1)
    }
    //立即更新
    const loading = ref<boolean>(false)
    const refresh = async () => {
      loading.value = true
      await getDetail()
      loading.value = false
      emit('refreshContent')
    }
    //状态仓
    const state = reactive<hostDetai>({
      online: false,
      last_offline_at: '',
      os: '',
      osver: '',
      host_name: '',
      ip: ''
    })
    //请求接口
    const getDetail = async () => {
      const res = await hostDetailHead(props.id!)
      for (let k in state) {
        state[k] = res[k]
      }
      osLogo.value = osLogoType(state.os, state.online)
      emit('update:host_ip', state.ip)
    }
    getDetail()
    return {
      ...toRefs(state),
      routes,
      goBack,
      loading,
      refresh,
      osLogo,
      t
    }
  }
})
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
