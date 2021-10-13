<template>
  <a-spin :tip="t('setting.pasing') + '...'" :spinning="spinning">
    <div class="uploadFile">
      <!-- 进度条 start -->
      <a-progress
        class="uploadprogre"
        :strokeWidth="2"
        :showInfo="false"
        strokeColor="#18ba79"
        :percent="uplpadPrg"
        v-if="uplpadPrg !== 0 && uplpadPrg !== 100"
        status="active"
      />
      <!-- 进度条 end -->
      <div class="lOpt">
        <!-- 系统logo start -->
        <!-- <custom-icon
          :type="osver === 'Windows' ? '#ax-os-win' : '#ax-os-Linux'"
          size="48"
          @click="jumpDetail"
          class="upicon"
        /> -->
        <img
          @click="jumpDetail"
          class="upicon"
          :src="osver === 'Windows' ? winPkg : linPkg"
          alt=""
        />
        <!-- 系统logo end -->
        <!-- 包信息或空 start -->
        <span v-if="!packageMsg.product_name" class="place">
          {{ $attrs.placeHolder }}
        </span>
        <div v-else>
          <slot name="text" />
        </div>
        <!-- 包信息或空 end -->
      </div>
      <div>
        <!-- 上传安装包 start -->
        <upload-file
          action="gapi/agent/packages"
          :data="uploadData"
          @change="handleChange"
          :accept="osver === 'Windows' ? '.exe' : '.gz'"
        >
          <a-button type="dashed" class="upbtn">
            {{ t('setting.updPkg') }}
          </a-button>
        </upload-file>
        <!-- 上传安装包 end -->
        <!-- 版本撤回 start -->
        <a-popover
          v-if="packageMsg.enable_recall"
          trigger="click"
          destroyTooltipOnHide
          overlayClassName="popNoPad"
          placement="bottom"
        >
          <template #content>
            <div class="nodes" @click="recallVersion">
              {{ t('setting.recall') }}
            </div>
          </template>
          <EllipsisOutlined />
        </a-popover>
        <!-- 版本撤回 end -->
      </div>
    </div>
  </a-spin>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { Popover, message, Progress, Spin } from 'ant-design-vue'
import uploadFile, { FileInfo } from '@/components/upload-file'
import { useRouter } from 'vue-router'
import { PackageMsg } from '../../upgrade/type'
import { recallAgent } from '@/api/setting/agent'
import winPkg from '@/assets/images/win_pkg.png'
import linPkg from '@/assets/images/lin_pkg.png'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    EllipsisOutlined,
    uploadFile,
    [Popover.name]: Popover,
    [Progress.name]: Progress,
    [Spin.name]: Spin
  },
  props: {
    packageMsg: {
      type: Object as PropType<PackageMsg>,
      required: true
    },
    osver: String as PropType<'Windows' | 'Linux'>
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    //spining
    const spinning = ref<boolean>(false)
    const router = useRouter()
    const jumpDetail = () => {
      router.push({
        name: 'adaptation-agent'
      })
    }
    //上传进度
    const uplpadPrg = ref<number>(0)
    //上传附带参数
    const uploadData = {
      osver: props.osver === 'Windows' ? '1' : '0',
      file_type: 0
    }
    //上传完成
    const handleChange = (info: FileInfo) => {
      //百分比
      uplpadPrg.value = Math.floor(info.file.percent as number)
      //上传进度到90开始解析
      if (uplpadPrg.value >= 90) {
        spinning.value = true
      }
      //解析完成/上传错误
      if (info.file.status === 'done' || info.file.status === 'error') {
        spinning.value = false
      }
      //上传接口失败
      if (info.file.status === 'error') {
        message.error(t('common.serverError'))
      }
      if (info.file.response) {
        if (info.file.response.code) {
          message.error(info.file.response.msg || t('setting.uploadError'))
        } else {
          message.success(t('setting.uploadSuc'))
          const pkgMsg = info.file.response
          Object.assign(props.packageMsg, pkgMsg)
          emit('refreshCmt')
        }
      }
    }
    //版本撤回
    const recallVersion = async () => {
      const { code } = await recallAgent({
        osver: props.osver === 'Windows' ? '1' : '0'
      })
      !code && emit('refreshCmt', true)
    }
    return {
      uploadData,
      handleChange,
      uplpadPrg,
      jumpDetail,
      spinning,
      recallVersion,
      winPkg,
      linPkg,
      t
    }
  }
})
</script>
<style lang="less" scoped>
.uploadFile {
  position: relative;
  height: 88px;
  background: #f8f8f8;
  border-radius: 8px;
  border: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 0 24px;
  .lOpt {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .upicon {
    margin-right: 16px;
    cursor: pointer;
    width: 48px;
    height: 48px;
  }
  .upbtn {
    width: 100px;
    margin-right: 8px;
  }
}
.uploadprogre {
  position: absolute;
  bottom: -8px;
  left: 0;
}
.place {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  line-height: 20px;
}
.nodes {
  padding: 0 16px;
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  &:hover {
    background: #eee;
  }
}
</style>
