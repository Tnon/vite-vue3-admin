<template>
  <div class="userinfo">
    <a-avatar class="avatar" :src="avatar">
      <template #icon><UserOutlined class="avaicon" /></template>
    </a-avatar>
    <div>
      <div class="name">{{ name }}</div>
      <div class="email">{{ email }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Avatar } from 'ant-design-vue'
import { UserOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    [Avatar.name]: Avatar,
    UserOutlined
  },
  props: {
    name: String,
    email: String,
    avatar: String
  },
  setup() {}
})
</script>
<style lang="less" scoped>
.userinfo {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  .avatar {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    .avaicon {
      font-size: 14px;
    }
  }
  .name {
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }
  .email {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
