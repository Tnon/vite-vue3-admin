<template>
  <div>
    <div class="laint">
      <span class="label">
        {{ setKey === 'email' ? t('setting.maiLmt') : t('setting.smsLmt') }}
      </span>
      <a-input-number
        class="iptNum"
        v-model:value="responseState.freq"
        :min="1"
        :placeholder="
          setKey === 'email'
            ? t('common.range', ['1-10000'])
            : t('common.range', ['1-20'])
        "
      />
    </div>
    <div class="subtitle">
      {{ setKey === 'email' ? t('setting.addMx') : t('setting.addPnumL') }}
    </div>
    <div class="formContent">
      <a-form ref="formRef" class="formCs" :model="formState" :rules="rules">
        <a-form-item ref="name" name="name" :autoLink="false">
          <a-input
            v-model:value.trim="formState.name"
            :placeholder="
              setKey === 'email' ? t('report.pIprCmail') : t('user.pIptPnum')
            "
          />
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="onSubmit">
        {{ t('common.add') }}
      </a-button>
    </div>
    <template v-for="(item, index) in responseState.accept" :key="item">
      <Tag class="tagSelf" closable @close="closeTag(index)">
        {{ item }}
      </Tag>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref, unref } from 'vue'
import { InputNumber, Tag } from 'ant-design-vue'
import { validateEmail, validatePhone } from '@/utils/reg'
import { cloneDeep } from 'lodash'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [InputNumber.name]: InputNumber,
    Tag
  },
  props: {
    state: Object,
    setKey: String as PropType<'email' | 'phone'>
  },
  setup(props) {
    const { t } = useI18n()
    const responseState = reactive(cloneDeep(props.state!))
    const formRef = ref<any>()
    const formState = reactive({
      name: ''
    })
    const rules = {
      name: [
        {
          message:
            props.setKey === 'email' ? t('setting.addMx') : t('user.pIptPnum'),
          trigger: 'blur',
          validator: props.setKey === 'email' ? validateEmail : validatePhone
        }
      ]
    }
    const onSubmit = async () => {
      try {
        await unref(formRef).validate()
        if (responseState!.accept.indexOf(formState.name) < 0) {
          responseState!.accept.push(formState.name)
          formState.name = ''
        }
      } catch {
        return
      }
    }
    const closeTag = (index) => {
      responseState!.accept.splice(index, 1)
    }
    return {
      rules,
      formRef,
      formState,
      onSubmit,
      closeTag,
      responseState,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.formContent {
  display: flex;
  .formCs {
    margin-right: 16px;
    flex: 1;
    ::v-deep(.ant-input) {
      border-radius: 8px;
    }
  }
}
.laint {
  margin-bottom: 24px;
  .label {
    margin-right: 16px;
  }
}
.subtitle {
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
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
.iptNum {
  border-radius: 8px;
  margin-left: 8px;
  width: 120px;
}
</style>
