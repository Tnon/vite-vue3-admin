<template>
  <div>
    <a-form class="saftpol bk_br_sd" v-for="(node, key) in types" :key="key">
      <!-- label start -->
      <div class="itemtitle">
        <span>{{ t('strategy.' + DomainType[key]) }}</span>
        <span
          v-if="key === 'emergency' || key === 'driveModel'"
          class="subtitle"
        >
          {{ t('strategy.' + DomainType[key + 'subTitle']) }}
        </span>
      </div>
      <!-- label end -->

      <!-- config switch Or radio start -->
      <div class="itemcontent">
        <div
          class="itemflex"
          :class="{
            slotsContainer:
              configFilds[item.key] === '1' && item.key === 'driinj'
          }"
          v-for="item in node"
          :key="item.label"
        >
          <!-- switch start -->
          <span class="itemlabel">
            <a-switch
              v-if="item.switch"
              v-bind="
                Object.assign(item.switchVs, {
                  checkedValue:
                    configFilds[item.key] === '0'
                      ? item.switchVs.checkedValue
                      : configFilds[item.key]
                })
              "
              v-model:checked="configFilds[item.key]"
            />
            <span class="label"> {{ item.label }}</span>
            <a-tooltip placement="right" color="#fff" destroyTooltipOnHide>
              <template #title>
                <span class="labelmsg_icon" v-html="item.msg"></span>
              </template>
              <QuestionCircleOutlined />
            </a-tooltip>
          </span>
          <!-- switch end -->

          <!-- radio start -->
          <a-form-item v-if="item.radio && configFilds[item.key] !== '0'">
            <a-radio-group
              @change="changeRadio($event, item)"
              v-model:value="configFilds[item.key]"
            >
              <a-radio value="1" v-if="!item.unintercept">
                {{ t('strategy.intPar') }}
              </a-radio>
              <a-radio value="2"> {{ t('strategy.repOnly') }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <!-- radio end -->

          <!-- 注入模块开启 start -->
          <drive-injection
            v-if="configFilds[item.key] === '1' && item.key === 'driinj'"
            :injectcfgs="configFilds['injectcfgs']"
          />
          <!-- 注入模块开启 end -->
        </div>
      </div>

      <!-- config switch Or radio end -->
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { Tooltip } from 'ant-design-vue'
import { DomainType } from '@/enums/domainType'
import { Nodes } from '../../detail/type'
import { driveInjection } from './index'
import { cloneDeep } from 'lodash'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Tooltip.name]: Tooltip,
    QuestionCircleOutlined,
    driveInjection
  },
  props: {
    typesForm: Object as PropType<{ [key: string]: Nodes }>,
    configFilds: Object
  },
  setup(props) {
    const { t } = useI18n()
    //防止污染全局初始化数据
    const types = cloneDeep(props.typesForm)
    const changeRadio = (e, item) => {
      if (item.switchVs) {
        item.switchVs.checkedValue = e.target.value
      }
    }
    return {
      DomainType,
      changeRadio,
      types,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.saftpol {
  margin: 16px 0;
}
.saftpol:last-child {
  margin-bottom: 0;
}
.itemtitle {
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  padding: 0 24px;
  .subtitle {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    margin-left: 16px;
  }
}
.itemcontent {
  padding: 8px;
  .itemflex {
    margin: 8px 0;
    display: flex;
    justify-content: space-between;

    padding: 0 24px;
    align-items: center;
    .itemlabel {
      line-height: 56px;
      height: 56px;
      font-size: 14px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
      .label {
        margin: 0 8px;
      }
    }
  }
  ::v-deep(.ant-form-item) {
    margin-bottom: 0;
  }
}
.labelmsg_icon {
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  text-shadow: 0px 0px 16px rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.85);
}
.slotsContainer {
  display: block !important;
  height: auto !important;
  line-height: unset !important;
}
</style>
