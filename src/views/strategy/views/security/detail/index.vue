<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2021-09-30 17:08:26
-->
<template>
  <div>
    <!-- {{ formFilds }} -->
    <!-- {{ configFilds }} -->
    <!-- 头部 start -->
    <back-header path="strategy-security-index">
      <span>{{ title }}</span>
      <template #confirm>
        <a-button class="btn" type="primary" @click="confirm">
          {{ t('common.complete') }}
        </a-button>
      </template>
    </back-header>
    <!-- 头部end -->
    <div class="boxContent">
      <!-- 表单 start -->
      <div class="bk_br_sd formContent">
        <slot-from
          class="form"
          ref="formRef"
          :colsMap="formItems"
          :disKeys="{ name: ~~strategy_id === 1, desc: ~~strategy_id === 1 }"
          v-model:fields="formFilds"
        />
      </div>
      <!-- 表单 end -->

      <!-- switch start -->
      <div class="swtNode bk_br_sd">
        <switch-node class="" :types="FTypes" v-model:actived="activedType" />
      </div>
      <!-- switch end -->
      <!-- 配置 start -->
      <template v-for="(item, key) in FormTypes" :key="key">
        <config-form
          v-if="activedType === key"
          :configFilds="configFilds[key]"
          :typesForm="item"
        />
      </template>

      <!-- 配置 end -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useFormItems, configForm } from '../cmts'
import { backHeader } from '../../../components'
import slotFrom from '@/components/slots-form'
import switchNode from '@/components/switchNodes'
import { FTypes, useFormTypes } from './type'
import { useRoute, useRouter } from 'vue-router'
import {
  getSercuityDetail,
  addSercuity,
  updateSercuity
} from '@/api/strategy/security'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    backHeader,
    slotFrom,
    configForm,
    switchNode
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const formItems = useFormItems(t)
    const FormTypes = useFormTypes(t)
    //行id
    const {
      query: { strategy_id }
    } = useRoute()
    //swt
    const activedType = ref<string>('windows')

    //表单元素
    const formRef = ref<any>('')

    //标题
    const title = ref<string>(t('strategy.addSer'))

    //表单值
    const formFilds = reactive({
      name: '',
      desc: ''
    })

    //配置值
    const configFilds = reactive({
      windows: {
        //防护模式配置
        attack: '2',
        risk: '2',
        //通用防护能力
        behavior: '2',
        accrisk: '2',
        puppet: '1',
        memwebshell: '1',
        rootkit: '1',
        //域控防护能力
        goldtick: '0',
        lsass: '0',
        dlog: '0',
        netlogon: '0',
        //应急处置
        driinj: '1',
        agtpro: '0',
        //注入 idArr
        injectcfgs: []
      },
      linux: {
        //防护模式配置
        attack: '2',
        risk: '2',
        //通用防护能力
        behavior: '1',
        accrisk: '2',
        memwebshell: '1',
        rootkit: '1',
        //应急处置
        driinj: '0',
        agtpro: '1',
        //注入 idArr
        injectcfgs: []
      }
    })

    //获取详情
    const getDetai = async () => {
      const {
        name,
        desc,
        switch: switchData
      } = await getSercuityDetail(strategy_id as any)
      formFilds.name = name
      formFilds.desc = desc
      // 赋值
      for (let k in configFilds.windows) {
        configFilds.windows[k] = switchData.windows[k] ?? '2'
      }
      for (let k in configFilds.linux) {
        configFilds.linux[k] = switchData.linux[k] ?? '2'
      }
    }
    if (strategy_id) {
      title.value = t('strategy.editSer')
      getDetai()
    }

    //新增策略
    const confirm = async () => {
      try {
        await formRef.value.validate()
      } catch {
        return
      }
      if (strategy_id) {
        //修改
        await updateSercuity(
          Object.assign(
            {},
            formFilds,
            { switch: configFilds },
            { id: ~~strategy_id }
          )
        )
      } else {
        //新增
        await addSercuity(Object.assign({}, formFilds, { switch: configFilds }))
      }
      router.push({
        name: 'strategy-security-index'
      })
    }
    return {
      title,
      formItems,
      formFilds,
      formRef,
      FormTypes,
      FTypes,
      activedType,
      configFilds,
      confirm,
      strategy_id,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.boxContent {
  height: calc(100vh - 96px);
  overflow: auto;
  margin: 16px 0;
}
.formContent {
  display: flex;
  justify-content: center;
  padding: 16px 0;
  .form {
    width: 600px;
    margin: 40px 0;
  }
}
.pthContainer {
  height: calc(100vh - 350px);
  margin: 16px 0;
  overflow: auto;
}
.swtNode {
  margin: 16px 0;
  padding: 12px 24px;
}
.cfgForm {
  margin: 16px 0;
}
</style>
