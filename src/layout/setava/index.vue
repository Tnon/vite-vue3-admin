<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-16 11:13:12
 * @LastEditTime: 2021-10-12 11:56:23
-->
<template>
  <div class="avaCon">
    <SettingOutlined
      class="setIcon"
      :class="activedS ? 'actived' : ''"
      v-if="showMenu"
      @click="linkTo('setting')"
    />
    <!-- -->

    <a-popover
      trigger="click"
      placement="rightBottom"
      destroyTooltipOnHide
      overlayClassName="popNoPad"
      :visible="popVisible"
      @visibleChange="visibleChange"
      :getPopupContainer="getPopupContainer"
    >
      <template #content>
        <avatarMenus :avatarUrl="avatarUrl" @closePop="popVisible = false">
          <div @click="linkTo('avatar')" class="accSet">
            {{ t('avatar.accSet') }}
          </div>
        </avatarMenus>
      </template>
      <a-avatar
        @click="popVisible = true"
        class="avatar"
        :src="avatarUrl"
        :class="activedA ? 'actived' : ''"
      >
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </a-popover>
  </div>
</template>
<script lang="ts">
import { SettingOutlined, UserOutlined } from '@ant-design/icons-vue'
import { Avatar, Popover } from 'ant-design-vue'
import { defineComponent, watch, ref, reactive, toRefs, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import store from '@/store'
import avatarMenus from './components/avatarMenus'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'SettingAvatar',
  components: {
    SettingOutlined,
    UserOutlined,
    avatarMenus,
    [Avatar.name]: Avatar,
    [Popover.name]: Popover
  },
  setup() {
    const { t } = useI18n()
    const getPopupContainer = (e) => e.parentNode
    //手动控制pop
    const popVisible = ref<boolean>(false)
    //路由跳转
    const router = useRouter()
    const currentRoute = useRoute()
    //设置 还是 头像
    const actived = reactive({
      activedS: (currentRoute.name as string).indexOf('setting-') > -1,
      activedA: (currentRoute.name as string).indexOf('avatar-') > -1
    })
    //关闭pop 跳转路由
    const linkTo = (name) => {
      popVisible.value = false
      router.push({ name })
    }
    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        actived.activedS = false
        actived.activedA = false
        if ((currentRoute.name as string).indexOf('setting-') > -1) {
          actived.activedS = true
        } else if ((currentRoute.name as string).indexOf('avatar-') > -1) {
          actived.activedA = true
        }
      }
    )

    //头像
    const avatarUrl = computed(() => store.getters['user/userAvatar'])
    const u_type = computed(() => store.state.user.user_info.u_type as number)
    //审计管理员
    const showMenu = ref<boolean>(true)
    if (u_type.value === 2) {
      showMenu.value = ['log', 'report'].includes(currentRoute.name as string)
    }
    const visibleChange = (v) => {
      popVisible.value = v
    }
    return {
      linkTo,
      avatarUrl,
      popVisible,
      visibleChange,
      getPopupContainer,
      ...toRefs(actived),
      showMenu,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.avaCon {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  .setIcon {
    font-size: 18px;
    cursor: pointer;
    width: 100%;
  }
  .actived {
    color: #18ba79;
  }
  .avatar {
    margin-top: 28px;
    cursor: pointer;
  }
}
</style>
