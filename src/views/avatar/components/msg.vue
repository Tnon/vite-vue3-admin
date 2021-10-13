<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-16 15:14:00
 * @LastEditTime: 2021-10-12 10:33:42
-->
<template>
  <div>
    <div class="header">{{ t('setting.perInfo') }}</div>
    <upload-file
      action="api/upload/profile"
      :beforeUpload="beforeUpload"
      @change="handleChange"
    >
      <a-avatar class="avatarCOn" :src="avatatUrl">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </upload-file>

    <div class="fitem">
      <div class="label">{{ t('user.name') }}</div>
      <div class="value">{{ userInfo.name }}</div>
    </div>
    <div class="fitem">
      <div class="label">{{ t('user.loginEmail') }}</div>
      <div class="value">{{ userInfo.email }}</div>
    </div>
    <div class="fitem">
      <div class="label">{{ t('user.dep') }}</div>
      <div class="value">{{ userInfo.dept }}</div>
      <EditOutlined class="editicon" @click="editMsg('dept', userInfo.dept)" />
    </div>
    <div class="fitem">
      <div class="label">{{ t('user.mobNum') }}</div>
      <div class="value">{{ userInfo.mobile }}</div>
      <EditOutlined
        class="editicon"
        @click="editMsg('mobile', userInfo.mobile)"
      />
    </div>
    <div class="fitem">
      <div class="label">{{ t('user.telNum') }}</div>
      <div class="value">{{ userInfo.telephone }}</div>
      <EditOutlined
        class="editicon"
        @click="editMsg('telephone', userInfo.telephone)"
      />
    </div>
    <div class="fitem">
      <div class="label">{{ t('report.creatTime') }}</div>
      <div class="value">{{ userInfo.created_at }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, unref } from 'vue'
import { EditOutlined, UserOutlined } from '@ant-design/icons-vue'
import { Avatar, message } from 'ant-design-vue'
import { useModal } from '@/hooks'
import uploadFile, { FileItem, FileInfo } from '@/components/upload-file'
import store from '@/store'
import { isPng } from '@/utils/is'
import modifyModal from './modifyModal'
import { updateDeptApi, updateMobileApi, upadteTelphoneApi } from '@/api/user'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    avatatUrl: String,
    userInfo: Object
  },
  components: {
    EditOutlined,
    UserOutlined,
    uploadFile,
    [Avatar.name]: Avatar
  },
  setup(props) {
    const { t } = useI18n()
    //头像
    const editMsg = (type, content) => {
      let titleNext = ''
      switch (type) {
        case 'dept':
          titleNext = t('user.dep')
          break
        case 'mobile':
          titleNext = t('user.mobNum')
          break
        default:
          titleNext = t('user.telNum')
          break
      }
      useModal(
        {
          title: t('common.modify') + ' ' + titleNext,
          contentProps: {
            fields: reactive({
              [type]: content || ''
            }),
            type
          },
          handleOk: async (modelRef) => {
            await unref(modelRef.formRef).validate()

            let params = {
              [type]: modelRef.fields[type],
              id: props.userInfo!.id
            }
            switch (type) {
              case 'dept':
                // 修改部门名称
                const { dept } = await updateDeptApi(props.userInfo!.id, params)
                props.userInfo!.dept = dept
                break
              case 'mobile':
                // 修改电话号码
                const { mobile } = await updateMobileApi(
                  props.userInfo!.id,
                  params
                )
                props.userInfo!.mobile = mobile
                break
              default:
                // 修改座机号码
                if (!modelRef.fields[type]) {
                  message.error(t('user.pIptMnum'))
                  return
                }
                const { telephone } = await upadteTelphoneApi(
                  props.userInfo!.id,
                  params
                )
                props.userInfo!.telephone = telephone
                break
            }
            store.commit('user/SetUserInfo', props.userInfo)
          }
        },
        modifyModal
      )
    }
    //上传之前校验
    const beforeUpload = (file: FileItem) => {
      if (isPng(file.name!)) {
        Promise.resolve(file)
      } else {
        message.error(t('setting.upLpng'))
        return false
      }
    }
    //上传完成
    const handleChange = (info: FileInfo) => {
      if (info.file.status === 'error') {
        message.error(t('setting.uploadError'))
      }
      if (info.file.status === 'done') {
        const { url: centerlogo } = info.file.response as any
        store.commit('user/SetUserInfoAvatar', centerlogo)
      }
      if (info.file.response) {
        if (info.file.response.code) {
          message.error(info.file.response.msg || t('setting.uploadError'))
        } else {
          message.success(t('setting.uploadSuc'))
          const { url: centerlogo } = info.file.response as any
          store.commit('user/SetUserInfoAvatar', centerlogo)
        }
      }
    }
    return {
      editMsg,
      beforeUpload,
      handleChange,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  height: 40px;
  line-height: 40px;
  font-weight: 800;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
  letter-spacing: 0;
  text-align: justify;
  margin-bottom: 20px;
}
.avatarCOn {
  width: 60px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  &:hover {
    background: #000;
    opacity: 0.4;
  }
}
.fitem {
  margin: 30px 0;
  display: flex;
  .label {
    min-width: 150px;
    font-size: 14px;
    color: #888;
  }
  .value {
    flex: 1;
  }
  .editicon {
    color: #00be2d;
    cursor: pointer;
    font-size: 20px;
  }
}
</style>
