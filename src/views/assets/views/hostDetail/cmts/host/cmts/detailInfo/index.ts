import detailInfo from './index.vue'
export default detailInfo
export const useInfoData = (t) => [
  {
    title: t('setting.cbasic'),
    key: 'baseInfo',
    children: [
      {
        label: t('asset.curLogAcc'),
        key: 'logon_username',
        value: ''
      },
      {
        label: t('common.hostName'),
        key: 'computer_name',
        value: ''
      },
      {
        label: t('asset.ipAddIn'),
        key: 'ip',
        value: ''
      },
      {
        label: t('asset.ipAddEx'),
        key: 'external_ip',
        value: ''
      },
      {
        label: t('asset.macAdd'),
        key: 'mac',
        value: ''
      },
      {
        label: t('asset.geteWay'),
        key: 'gateway',
        value: ''
      },
      {
        label: t('common.system'),
        key: 'os',
        value: ''
      },
      {
        label: t('asset.kerVer'),
        key: 'kernel_version',
        value: ''
      },
      {
        label: t('asset.cpuArc'),
        key: 'arch',
        value: ''
      },
      {
        label: t('asset.jdkVer'),
        key: 'jdk_version',
        value: ''
      },
      {
        label: t('asset.lastOnliTm'),
        key: 'last_online_at',
        value: ''
      },
      {
        label: t('asset.lastOffLineTime'),
        key: 'last_offline_at',
        value: ''
      },
      {
        label: t('asset.midWarVer'),
        key: 'web_middleware_version',
        value: ''
      },
    ]
  },
  {
    title: t('asset.hostMana'),
    key: 'hostManage',
    children: [
      {
        label: t('common.group'),
        key: 'group_kv_path',
        value: ''
      },
      {
        label: t('common.tag'),
        key: 'tag',
        value: ''
      },
    ]
  },
  {
    title: t('asset.agtInfo'),
    key: 'agent',
    children: [
      {
        label: t('asset.idNUm'),
        key: 'host_id',
        value: ''
      },
      {
        label: t('asset.curVer'),
        key: 'agent_version',
        value: ''
      },
      {
        label: t('asset.accDate'),
        key: 'created_at',
        value: ''
      },
      {
        label: t('asset.updDate'),
        key: 'info_time',
        value: ''
      },
      {
        label: t('setting.driverVer'),
        key: 'drive_version',
        value: ''
      },
      {
        label: t('asset.behLibVer'),
        key: 'behavior_lib_version',
        value: ''
      },
      {
        label: t('asset.jdkAgtVer'),
        key: 'agent_jdk_version',
        value: ''
      },

    ]
  }]