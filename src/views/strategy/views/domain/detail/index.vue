<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2021-09-30 18:49:07
-->
<template>
  <div>
    <!-- {{ pthModel }} -->
    <!-- {{ formFilds }} -->
    <!-- 头部 start -->
    <back-header path="strategy-domain-index">
      <span>{{ title }}</span>
      <template #confirm>
        <a-button class="btn" type="primary" @click="confirm">{{
          t('common.complete')
        }}</a-button>
      </template>
    </back-header>
    <!-- 头部end -->

    <!-- 表单 start -->
    <div class="bk_br_sd formContent">
      <slot-from
        class="form"
        ref="formRef"
        :colsMap="formItems"
        :fields="formFilds"
      />
    </div>
    <!-- 表单 end -->

    <!-- pth start -->
    <pth-pro class="pthContainer bk_br_sd" :pthModel="pthModel" />
    <!-- pth end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useFormItems, pthPro } from '../cmts'
import { backHeader } from '../../../components'
import slotFrom from '@/components/slots-form'
import { CardState } from './type'
import { AddDomainPara } from '@/api/strategy/model'
import {
  addDomain,
  getDomainDetail,
  updateSercuity
} from '@/api/strategy/domain'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    backHeader,
    slotFrom,
    pthPro
  },
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const formItems = useFormItems(t)
    //行id
    const {
      query: { strategy_id }
    } = useRoute()
    //表单元素
    const formRef = ref<any>('')

    //标题
    const title = ref<string>(t('strategy.creatDom'))

    //表单值
    const formFilds = reactive({
      name: '',
      desc: ''
    })

    //pth值
    const pthModel = reactive<CardState>({
      switch: 0,
      ip: 2,
      ipList: [],
      account: 2,
      accountList: []
    })

    //确定
    const confirm = async () => {
      //表单验证
      try {
        await formRef.value.validate()
      } catch {
        return
      }
      //给后台发送的数据
      const sendObj: AddDomainPara = Object.assign(formFilds, {
        object: {
          switch: pthModel.switch,
          ip_json: pthModel.ip === 2 ? [] : pthModel.ipList,
          switch_acc: pthModel.account,
          ip_json_acc: pthModel.account === 2 ? [] : pthModel.accountList
        }
      })
      //修改
      if (strategy_id) {
        sendObj.id = ~~strategy_id as any
        await updateSercuity(sendObj)
      } else {
        //新增
        await addDomain(Object.assign(sendObj))
      }

      router.push({
        name: 'strategy-domain-index'
      })
    }

    //获取详情
    const getDetai = async () => {
      const { desc, name, object } = await getDomainDetail(strategy_id as any)
      formFilds.desc = desc
      formFilds.name = name
      pthModel.switch = object.switch
      pthModel.ip = object.ip_json.length ? 1 : 2
      pthModel.ipList = object.ip_json
      pthModel.account = object.switch_acc
      pthModel.accountList = object.ip_json_acc
    }
    if (strategy_id) {
      title.value = '修改域控策略'
      getDetai()
    }
    return {
      title,
      formItems,
      formFilds,
      formRef,
      pthModel,
      confirm,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.formContent {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  height: 246px;
  overflow: auto;
  padding: 16px 0;
  .form {
    width: 600px;
    margin: 40px 0;
  }
}
.pthContainer {
  height: calc(100vh - 358px);
  margin: 16px 0;
  overflow: auto;
}
</style>
