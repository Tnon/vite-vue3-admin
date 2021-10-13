<template>
  <div class="box">
    <!-- 头像 start -->
    <div class="avatar">
      <a-avatar class="avatarCOn" :src="userInfo.head_image">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <div>
        <div class="name">{{ userInfo.name }}</div>
        <div class="email">{{ userInfo.email }}</div>
        <div class="role">
          {{
            userInfo.u_type === 1 ? t('user.sysAdmin') : t('user.auditAdmin')
          }}
        </div>
      </div>
    </div>
    <!-- 头像 end -->

    <!-- licenst start -->
    <licenseFile @closePop="closePop" />
    <!-- licenst end -->

    <!-- bar start -->
    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="vertical"
      class="avaMenus"
    >
      <div class="ant-menu-item">
        <slot />
      </div>
      <!-- <div class="ant-menu-item">全屏</div> -->
      <a-sub-menu key="sub1">
        <template #title>{{ t('avatar.language') }}</template>
        <div
          class="ant-menu-item"
          :class="{ actived: LocalLang === Language.ZH }"
          @click="langChange(Language.ZH)"
        >
          {{ t('avatar.chinese') }}
        </div>
        <div
          class="ant-menu-item"
          :class="{ actived: LocalLang === Language.EN }"
          @click="langChange(Language.EN)"
        >
          English
        </div>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>{{ t('avatar.swtMode') }}</template>
        <div
          class="ant-menu-item"
          :class="{ actived: THEME === CustomTheme.LIGHT }"
          @click="themeChange(CustomTheme.LIGHT)"
        >
          {{ t('avatar.whiTheme') }}
        </div>
        <div
          class="ant-menu-item"
          :class="{ actived: THEME === CustomTheme.DARK }"
          @click="themeChange(CustomTheme.DARK)"
        >
          {{ t('avatar.blaTheme') }}
        </div>
      </a-sub-menu>
    </a-menu>
    <!-- bar end -->

    <!-- 离线时间 start -->
    <div class="offTime">
      {{ t('avatar.lastLogo') }}{{ userInfo.last_logout_at }}
    </div>
    <!-- 离线时间 end -->
    <!-- 退出登录 start -->
    <div class="logout" @click="logout">{{ t('avatar.logOut') }}</div>
    <!-- 退出登录 end -->
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
  inject,
  ref,
  ComputedRef
} from 'vue'
import licenseFile from '../licenseFile'
import { Menu, Avatar } from 'ant-design-vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { Language, CustomTheme } from '@/enums/language'
import store from '@/store'
import { toogleLang } from '@/plugins/setupGlobalLocalLang'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    avatarUrl: String
  },
  components: {
    licenseFile,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    UserOutlined,
    [Avatar.name]: Avatar
  },
  setup(_, { emit }) {
    const { t } = useI18n()
    //接收刷新tabview的reload，国际化
    const reload: any = inject('reload')
    //关闭弹框
    const closePop = () => {
      emit('closePop')
    }
    const userInfo = computed(() => store.state.user.user_info)
    const state = reactive({
      selectedKeys: []
    })
    const logout = async () => {
      store.dispatch('user/logout')
    }
    //主题色
    const themeChange = (THEME: CustomTheme) => {
      store.commit('langTheme/SetTheme', THEME)
    }
    const THEME: ComputedRef<CustomTheme> = computed(
      () => store.state.langTheme.theme
    )

    //语言
    const langChange = (LANG) => {
      toogleLang(LANG)
      reload()
      store.commit('langTheme/SetLocalLang', LANG)
    }
    const LocalLang = computed(() => store.state.langTheme.language)
    return {
      ...toRefs(state),
      userInfo,
      logout,
      themeChange,
      THEME,
      closePop,
      LocalLang,
      langChange,
      Language,
      CustomTheme,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.box {
  width: 280px;
  background: #fff;
  .avaMenus {
    padding: 8px 0;
    border-bottom: 1px solid #eee !important;
    ::v-deep(.ant-menu-item) {
      height: 40px;
      line-height: 40px;
      padding: 0 16px;
      margin: 0 !important;
    }
  }
  .avatar {
    padding: 24px;
    display: flex;
    align-self: start;
    border-bottom: 1px solid #eee;
    .avatarCOn {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
    .name {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      line-height: 20px;
      margin-bottom: 4px;
    }
    .email {
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      line-height: 18px;
      margin-bottom: 8px;
    }
    .role {
      display: inline-block;
      padding: 2px 8px;
      background: rgba(24, 186, 121, 0.15);
      font-size: 12px;
      font-weight: 600;
      color: #18ba79;
      line-height: 20px;
    }
  }
  .accSet {
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    margin-top: 8px;
    cursor: pointer;
  }
  .offTime {
    margin-top: 8px;
    height: 34px;
    line-height: 34px;
    padding: 0 16px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
  }
  .logout {
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: #18ba79;
    }
  }
}
.actived {
  background: #eee;
}
</style>
