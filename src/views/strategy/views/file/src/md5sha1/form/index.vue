<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item :label="t('strategy.attriskName')" v-bind="validateInfos.name">
      <a-input v-model:value.trim="fields.name" />
    </a-form-item>
    <a-form-item :label="t('common.system')" v-bind="validateInfos.osver">
      <a-radio-group v-model:value="fields.osver">
        <a-radio value="1">Windows</a-radio>
        <a-radio value="0">Linux</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      :label="t('strategy.addType')"
      v-bind="validateInfos.mdOrShatype"
    >
      <a-checkbox-group
        v-model:value="fields.mdOrShatype"
        @change="changeCheck"
      >
        <div class="label">
          <a-checkbox value="md5" class="checbox">MD5</a-checkbox>
          <a-form-item
            v-show="fields.mdOrShatype.includes('md5')"
            class="inputItem"
            v-bind="validateInfos.md5"
          >
            <a-input v-model:value.trim="fields.md5" />
          </a-form-item>
        </div>
        <br />
        <div class="label">
          <a-checkbox value="sha1" class="checbox">SHA1</a-checkbox>
          <a-form-item
            class="inputItem"
            v-show="fields.mdOrShatype.includes('sha1')"
            v-bind="validateInfos.sha1"
          >
            <a-input v-model:value.trim="fields.sha1" />
          </a-form-item>
        </div>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item :label="t('common.remarks')" v-bind="validateInfos.remarks">
      <a-input v-model:value.trim="fields.remark" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRules } from './index'
import { Form } from 'ant-design-vue'
import { validateMd5, validateSha1, validateNone } from '@/utils/reg'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    fields: Object
  },
  setup(props) {
    const { t } = useI18n()
    const Rules = useRules(t)
    const useForm = Form.useForm
    //表格验证md5或者sha1
    const changeCheck = (v) => {
      if (!v.includes('sha1')) {
        props.fields!.sha1 = ''
      }
      if (!v.includes('md5')) {
        props.fields!.md5 = ''
      }
      if (v?.length) {
        Rules['sha1'][0].validator = v.includes('sha1')
          ? validateSha1
          : validateNone
        Rules['md5'][0].validator = v.includes('md5')
          ? validateMd5
          : validateNone
      } else {
        Rules['md5'][0].validator = validateNone
        Rules['sha1'][0].validator = validateNone
      }
    }

    const { validate, validateInfos } = useForm(props.fields!, Rules)
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      Rules,
      validate,
      validateInfos,
      changeCheck,
      t
    }
  }
})
</script>

<style lang="less" scoped>
::v-deep(.ant-checkbox-inner) {
  border-radius: 50%;
}
::v-deep(.ant-checkbox-checked::after) {
  border-radius: 50%;
}
::v-deep(.ant-checkbox-group) {
  width: 100%;
  .inputItem {
    width: 100%;
  }
}
.label {
  display: flex;
  height: 32px;
}
.checbox {
  display: flex;
  align-items: center;
  width: 85px;
}
</style>
