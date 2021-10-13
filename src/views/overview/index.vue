<template>
  <div class="boxcon">
    <div class="header">
      <!-- 期间统计 start -->
      <statisc v-model:fold="fold" :class="!fold ? 'static' : ''" />
      <!-- 期间统计 end -->
      <!-- 登出期间 start -->
      <logoutSta class="logout" v-show="fold" />
      <!-- 登出期间 end -->
    </div>
    <!-- 攻击风险运维 start -->
    <atck-risk />
    <!-- 攻击风险运维 end -->

    <!-- 攻击风险监控 start -->
    <atk-rsk-mon />
    <!-- 攻击风险监控 end -->

    <!-- 主机统计 start -->
    <host-msg />
    <!-- 主机统计 end -->

    <!-- 最新事件/危险主机 start -->
    <event-danger />
    <!-- 最新事件/危险主机 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import statisc from './components/statis'
import logoutSta from './components/logoutSta'
import atckRisk from './components/atckRisk'
import atkRskMon from './components/atkRskMon'
import hostMsg from './components/hostMsg'
import eventDanger from './components/eventDanger'
export default defineComponent({
  components: {
    statisc,
    logoutSta,
    atckRisk,
    atkRskMon,
    hostMsg,
    eventDanger
  },
  setup() {
    const fold = ref<boolean>(true)
    return {
      fold
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  .static {
    width: 100%;
    transition: all 0.2s;
    border-radius: 8px 8px 0 0;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
  }
  .logout {
    background: #fff;
    height: 40px;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    margin-left: 8px;
    padding: 0 24px;
    flex: 1;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>
