/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-20 11:46:43
 * @LastEditTime: 2021-10-12 15:46:03
 */
import http from '@/utils/http/axios';
import { FilterState } from './model'

enum Api {
  uploadRecord = '/gapi/agent/packages/list',
  pkgVersions = '/gapi/agent/agent_latest_version',
  adpDriverList = '/gapi/agent/latest_drivers',
  agentVerList = '/gapi/agent/version_statistic',
  agentTableList = '/gapi/agent/host_version_list',
  getAgentUninstall = '/api/admin/system_configs',
  updateAgentUniApi = '/api/admin/system_configs',
  controlAgentUniApi = '/api/admin/system_configs',
  MigrateList = '/api/admin/migration_list',
  MigrateGroup = '/api/admin/migrate_onegroup',
  MigrateDetail = '/api/admin/migration_info',
  migHost = '/api/admin/manual_migrate',
  getDriverList = '/api/admin/getkdlist',
  resetAgent = '/api/admin/restartagent',
  collectLog = '/api/admin/applylog',
  collectLogProcess = '/api/admin/logstatus',
  agentVers = '/gapi/agent/all_versions',
  Adapted_os_list = '/gapi/agent/drivers/adapted_os_list',
  No_Adapted_os_list = '/gapi/agent/drivers/no_adapter_os_list',
  Adapted_host_list = '/gapi/agent/drivers/adapted_host_list',
  NoAdapted_host_list = '/gapi/agent/drivers/no_adapter_host_list',
  adaEnvVersion = '/gapi/agent/drivers/latest_versions',
  recallAgentVersion = 'gapi/agent/recall',
  agentEnableUp = '/gapi/agent/can_upgrade_host_count',
  driverEnableUp = '/gapi/agent/drivers/can_upgrade_host_count',
  batchUpgradeAgent = '/gapi/agent/batch_upgrade',
  batchUpgradeDriver = '/gapi/agent/drivers/upgrade',
  singleUpAgent = '/gapi/agent/upgrade',
  GetAndSetUpGtype = '/gapi/agent/upgrade_way',
  makeCmd = '/gapi/agent/make_install_cmd'
}

/**
 * @description: 上传记录
 */
export function getUploadRecords(params: tableParams<unknown>) {
  return http.request({
    url: Api.uploadRecord,
    method: 'POST',
    params
  });
}


/**
 * @description: 获取包版本信息
 */
export function getPkgVer() {
  return http.request({
    url: Api.pkgVersions,
    method: 'GET'
  });
}

/**
 * @description: 获取适配驱动库列表
 */
export function getDriverList(params: tableParams<{ osver: string }>) {
  return http.request({
    url: Api.adpDriverList,
    method: 'POST',
    params
  });
}
/**
 * @description: 获取版本分布
 */
export function getAgentVerList(params: { osver: string }) {
  return http.request({
    url: Api.agentVerList,
    method: 'GET',
    params
  });
}

/**
 * @description: 获取agent列表
 */
export function getAgentList(params: tableParams<FilterState>) {
  return http.request({
    url: Api.agentTableList,
    method: 'POST',
    params
  });
}
/**
 * @description: 获取agent版本列表
 */
export function getallvers() {
  return http.request({
    url: Api.agentVers,
    method: 'GET',
  });
}
/**
 * @description: 获取agent可升级数量
 */
export function getUpgradeableNumber(params: FilterState) {
  return http.request({
    url: Api.agentEnableUp,
    method: 'POST',
    params
  });
}
/**
 * @description: 获取驱动可升级数量
 */
export function getUpgradeableDriverNumber(params: { os: string, osver: string, driver_version: string }) {
  return http.request({
    url: Api.driverEnableUp,
    method: 'POST',
    params
  });
}
/**
 * @description 获取agent防卸载密码
 */
export function getAgentUninstallApi() {
  return http.request({
    url: Api.getAgentUninstall,
    method: 'GET'
  })
}

/**
 * @description 修改agent防卸载密码
 */
export function updateAgentUniApi(params: { agtuauth: number, authcode: string }) {
  return http.request({
    url: Api.updateAgentUniApi,
    method: 'POST',
    params
  }, {
    successMessageText: 'saveSuc'
  })
}

/**
 * @description 控制agent卸载开关
 */
export function controlAgentUniApi(params: { agtuauth: number, authcode?: string }) {
  return http.request({
    url: Api.controlAgentUniApi,
    method: 'POST',
    params
  })
}


/**
 * @description 管理中心迁移列表
 */
export function getMigrateList(params) {
  return http.request({
    url: Api.MigrateList,
    method: 'POST',
    params
  })
}
/**
 * @description 管理中心迁移
 */
export function MigrateGroup(params: { group_id: number, new_host: string, new_port: string }) {
  return http.request({
    url: Api.MigrateGroup,
    method: 'POST',
    params
  }, {
    successMessageText: 'issSuc'
  })
}
/**
 * @description: 获取迁移主机详情
 */
export function getMigrateDetail(params: tableParams<{ group: number }>) {
  return http.request({
    url: Api.MigrateDetail,
    method: 'POST',
    params
  });
}

/**
 * @description: 单台主机迁移
 */
export function migrateSingHost(params: { host_id: string }) {
  return http.request({
    url: Api.migHost,
    method: 'POST',
    params
  });
}

/**
 * @description 获取驱动管理表格数据
 */
export function getDriverListApi(params) {
  return http.request({
    url: Api.getDriverList,
    method: 'POST',
    params
  })
}

/**
 * @description 重启Agent
 */
export function resetAgentApi(params: { host_id: string }) {
  return http.request({
    url: Api.resetAgent,
    method: 'POST',
    params
  }, {
    successMessageText: 'agtCmdSuc'
  })
}

/**
 * @description 日志收集下载
 */
export function collectLogApi(params: { host_id: string, model: string }) {
  return http.request({
    url: Api.collectLog,
    method: 'POST',
    params
  }, {
    successMessageText: 'startCol'
  })
}

/**
 * @description 日志收集进度
 */
export function collectLogProcessApi(params: { host_id: string }) {
  return http.request({
    url: Api.collectLogProcess,
    method: 'GET',
    params
  })
}

/**
 * @description: 获取驱动已适配列表
 */
export function getAdapted_os_list(params: tableParams<{ os: string, osver: string, driver_version: string }>) {
  return http.request({
    url: Api.Adapted_os_list,
    method: 'POST',
    params
  });
}

/**
 * @description: 获取驱动未适配列表
 */
export function getNo_Adapted_os_list(params: tableParams<{ os: string, osver: string }>) {
  return http.request({
    url: Api.No_Adapted_os_list,
    method: 'POST',
    params
  });
}

/**
 * @description: 获取驱动已适配主机列表
 */
export function getAdapted_host_list(params: tableParams<{ os: string, ip: string }>) {
  return http.request({
    url: Api.Adapted_host_list,
    method: 'POST',
    params
  });
}
/**
 * @description: 获取驱动未适配主机列表
 */
export function getNo_Adapted_host_list(params: tableParams<{ os: string, ip: string }>) {
  return http.request({
    url: Api.NoAdapted_host_list,
    method: 'POST',
    params
  });
}
/**
 * @description: 获取适配环境列表
 */
export function getadaEnvVersion() {
  return http.request({
    url: Api.adaEnvVersion,
    method: 'GET',
  });
}

/**
 * @description agent版本撤回
 */
export function recallAgent(params: { osver: string }) {
  return http.request({
    url: Api.recallAgentVersion,
    method: 'POST',
    params
  },
    {
      successMessageText: 'verRecSuc'
    })
}


/**
 * @description 批量升级agent
 */
export function batchUpgradeAgent(params: { filter: FilterState, include: string, exclude: string }) {
  return http.request({
    url: Api.batchUpgradeAgent,
    method: 'POST',
    params
  })
}


/**
 * @description 单台/批量升级驱动
 */
export function batchUpgradeDriver(params: { filter: { os: string, osver: string, driver_version: string }, include: string, exclude: string }) {
  return http.request({
    url: Api.batchUpgradeDriver,
    method: 'POST',
    params
  })
}

/**
 * @description 单台升级agent
 */
export function upgradeAgentSingle(params: { id: string }) {
  return http.request({
    url: Api.singleUpAgent,
    method: 'POST',
    params
  })
}

/**
 * @description 单台升级主机(弹窗)
 */
export function upgradeHostSingle(params: { filter: { host_id: string } }) {
  return http.request({
    url: Api.batchUpgradeDriver,
    method: 'POST',
    params
  })
}


/**
 * @description 获取升级方式
 */
export function getUpGradeType() {
  return http.request({
    url: Api.GetAndSetUpGtype,
    method: 'GET',
  })
}

/**
 * @description 获取升级方式
 */
export function setUpGradeType(params: { way: number }) {
  return http.request({
    url: Api.GetAndSetUpGtype,
    method: 'POST',
    params
  },
    {
      successMessageText: 'setSuc'
    })
}

/**
 * @description 生成安装命令
 */
export function makeInstallCmd(params: { osver: string, group_id: number }) {
  return http.request({
    url: Api.makeCmd,
    method: 'GET',
    params
  })
}
