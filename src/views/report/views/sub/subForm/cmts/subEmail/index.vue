<template>
  <div>
    <slots-form
      class="subEmail"
      ref="slotsRef"
      :colsMap="formItems"
      :fields="fields"
      :formItemLayout="formItemLayout"
    >
      <a-button type="primary" @click="addEmail">
        {{ t('common.add') }}
      </a-button>
    </slots-form>
    <div v-if="showEmail">
      {{ t('report.setMailSer') }}
      <span class="setting" @click="goSetiing"> {{ t('report.setup') }}</span>
    </div>
    <template v-for="(item, index) in tagList" :key="item">
      <a-tag class="tagSelf" closable @close="closeTag(index)">
        {{ item }}
      </a-tag>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, unref } from 'vue'
import { message, Tag } from 'ant-design-vue'
import slotsForm from '@/components/slots-form'
import { getEmailConfigApi } from '@/api/setting/currency'
import { validateEmail } from '@/utils/reg'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {
    [Tag.name]: Tag,
    slotsForm
  },
  props: {
    tagList: {
      type: Array,
      default: []
    }
  },
  setup(props) {
    const { t } = useI18n()
    const formItems = [
      {
        dataIndex: 'emailValue',
        formProps: {
          type: 'input',
          extraSlot: true,
          placeholder: t('report.pIprCmail'),
          rules: [
            {
              required: true,
              trigger: 'blur',
              message: t('report.pIprCmail'),
              validator: validateEmail
            }
          ]
        }
      }
    ]
    const formItemLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 }
    }
    //是否配置了邮箱发送服务
    const showEmail = ref<boolean>(false)
    //表格元素
    const slotsRef = ref<any>('')
    const fields = reactive({
      emailValue: ''
    })
    //添加订阅邮箱
    const addEmail = async () => {
      //未配置
      const { smtp } = await getEmailConfigApi()
      if (!smtp.mail_username) {
        showEmail.value = true
        return
      } else {
        // 配置
        showEmail.value = false
      }
      try {
        await unref(slotsRef).validate()
        if (props.tagList.indexOf(fields.emailValue) < 0) {
          if (props.tagList.length >= 20) {
            message.error(t('report.subUpto'))
            return false
          }
          props.tagList.push(fields.emailValue)
          fields.emailValue = ''
        }
      } catch {
        return
      }
    }
    //删除订阅邮箱
    const closeTag = (index) => {
      props.tagList.splice(index, 1)
    }
    //路由
    const router = useRouter()
    //去配置邮箱发送服务
    const goSetiing = () => {
      router.push({
        name: 'setting-currency-notice'
      })
    }
    return {
      ...toRefs(fields),
      addEmail,
      closeTag,
      slotsRef,
      fields,
      formItems,
      showEmail,
      goSetiing,
      formItemLayout,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.ant-btn {
  border-radius: 0px 8px 8px 0;
}
::v-deep(.subEmail) {
  .ant-input {
    border-radius: 8px 0 0 8px;
  }
}
.tagSelf {
  // border: none;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 10px;
  position: relative;
  line-height: 30px;
  height: 30px;
  padding-right: 7px;
  &:hover {
    padding-right: 20px;
    ::v-deep(.anticon) {
      transform: scale(1);
    }
  }
  ::v-deep(.anticon) {
    transition: all 0.4s;
    position: absolute;
    right: 3px;
    top: 10px;
    transform: scale(0);
  }
}
.setting {
  color: #18ba79;
  cursor: pointer;
}
</style>
