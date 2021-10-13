<template>
  <div class="box">
    <div class="content bk_br_sd">
      <div class="lmenus">
        <a-avatar class="avatar" :src="avatatUrl">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <h3 class="name">{{ userInfo.name }}</h3>
        <div>
          <span class="role">{{
            userInfo.u_type === 1 ? t('user.sysAdmin') : t('user.auditAdmin')
          }}</span>
        </div>
      </div>
      <div class="tabs">
        <template v-for="item in tabs" :key="item.key">
          <div
            class="nodes"
            @click="actived = item.key"
            :class="{ actived: actived === item.key }"
          >
            {{ item.title }}
          </div>
        </template>
      </div>
    </div>
    <div class="rcontent bk_br_sd">
      <self-msg
        :avatatUrl="avatatUrl"
        :userInfo="userInfo"
        v-if="actived === 'msg'"
      />
      <self-pwd v-else />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { selfPwd, selfMsg } from './components'
import { Avatar } from 'ant-design-vue'
import store from '@/store'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    selfPwd,
    selfMsg,
    [Avatar.name]: Avatar,
    UserOutlined
  },
  setup() {
    const { t } = useI18n()
    const actived = ref<string>('msg')
    const tabs = [
      {
        title: t('setting.perInfo'),
        key: 'msg'
      },
      {
        title: t('setting.pwdSeting'),
        key: 'pwd'
      }
    ]
    //头像
    const avatatUrl = computed(() => store.getters['user/userAvatar'])
    //用户信息
    const userInfo = computed(() => store.state.user.user_info)
    return {
      tabs,
      actived,
      avatatUrl,
      userInfo,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.box {
  display: flex;
  margin: 12px 24px;
  .content {
    margin-right: 24px;
    height: calc(100vh - 24px);
  }
  .tabs {
    background: #fff;
    .nodes {
      height: 50px;
      line-height: 50px;
      padding: 0 16px;
      cursor: pointer;
    }
    .actived {
      color: #19be6b;
      background: #edfff3;
      border-right: 2px solid #19be6b;
    }
  }
  .lmenus {
    width: 260px;
    padding: 30px;
    background: #fff;
    text-align: center;
    margin-bottom: 16px;
    .avatar {
      width: 60px;
      height: 60px;
      line-height: 60px;
      font-size: 30px;
    }
    .name {
      margin: 16px 0;
    }
    .role {
      display: inline-block;
      font-size: 14px;
      color: #00be2d;
      padding: 3px 5px;
      background: #ebfaef;
      border: 1px solid #00be2d;
      border-radius: 2px;
    }
  }
}
.rcontent {
  width: 900px;
  padding: 0 24px;
}
</style>
