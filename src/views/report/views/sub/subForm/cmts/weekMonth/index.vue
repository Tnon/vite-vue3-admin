<template>
  <div class="dialog" :class="type == 'week' ? 'weekClass' : 'monthClass'">
    <span class="title">{{ t('setting.timeSec') }}</span>
    <a-checkbox-group v-model:value="agms[type]">
      <a-row>
        <template v-for="item in types" :key="item.value">
          <a-col :span="type == 'week' ? '24' : '6'">
            <a-checkbox :value="item.value" class="checkboxItem">{{
              item.label
            }}</a-checkbox>
          </a-col>
        </template>
      </a-row>
    </a-checkbox-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Row, Col } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  props: {
    types: Object,
    type: String,
    agms: Object
  },
  setup() {
    const { t } = useI18n()
    return {
      t
    }
  }
})
</script>

<style lang="less" scoped>
.dialog {
  position: absolute;
  top: 0;
  left: 99%;
  background: #fcf9fc;
  z-index: -1;
  text-align: center;
  padding: 15px 40px;
  height: 528px;
  .title {
    height: 56px;
    line-height: 56px;
    font-size: 18px;
    font-weight: 600;
  }
  .checkboxItem {
    margin: 16px 0;
  }
}
.weekClass {
  width: 220px;
}
.monthClass {
  width: 350px;
}
</style>
