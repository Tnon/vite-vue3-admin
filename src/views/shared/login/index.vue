<template>
  <div class="login-box">
    <a-form :model="formInline" @submit="handleSubmit">
      <div class="title">{{ t('login.anxinSec') }}</div>
      <a-form-item>
        <a-input
          v-model:value.trim="formInline.username"
          size="large"
          :placeholder="t('login.loginPlac')"
        >
          <template v-slot:prefix> <UserOutlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value.trim="formInline.password"
          size="large"
          :placeholder="t('asset.pIptPwdAd')"
          type="password"
          autocomplete="new-password"
        >
          <template v-slot:prefix> <LockOutlined /></template>
        </a-input>
      </a-form-item>
      <slider-verify v-model:status="slid_status" />
      <a-form-item class="mt30">
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          :loading="loading"
          :disabled="!slid_status"
          block
        >
          {{ t('login.login') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { SliderVerify } from '@/components/slideverify'
import { defineComponent, reactive, toRefs, ref, watch } from 'vue'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { pCompile } from '@/utils/urlUtils'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    SliderVerify
  },
  setup() {
    const { t } = useI18n()
    //登录结构体
    const state = reactive({
      loading: false,
      slid_status: false,
      formInline: {
        username: '',
        password: ''
      }
    })

    const store = useStore()
    const router = useRouter()
    const handleSubmit = async () => {
      const { username, password } = state.formInline
      if (username.trim() == '' || password.trim() == '')
        return message.warning(t('login.notEmpty'))
      state.loading = true
      const response = await store
        .dispatch('user/login', { username, password: pCompile(password) })
        .finally(() => {
          state.loading = false
        })
      if (response) {
        //审计管理员
        if (response.user.u_type === 2) {
          router.replace('/log/member')
        } else {
          router.replace('/')
        }
      }
    }

    return {
      ...toRefs(state),
      handleSubmit,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;

  background: url('@/assets/images/login-bg.jpg') no-repeat;
  background-position: 10% 40%;
  background-color: #0f1410;
  ::v-deep(.ant-form) {
    width: 400px;
    position: absolute;
    top: 30%;
    right: 15%;
    background: #fff;
    padding: 50px 30px;
    .ant-col {
      width: 100%;
    }
    .mt30 {
      margin-top: 30px;
    }
    .ant-form-item-label {
      padding-right: 6px;
    }
    .ant-input {
      font-size: 14px;
    }
    .title {
      text-align: center;
      font-weight: 800;
      font-size: 24px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 32px;
      margin-bottom: 40px;
    }
  }
}
</style>
