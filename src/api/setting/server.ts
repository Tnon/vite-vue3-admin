import http from '@/utils/http/axios'

enum Api {
  getLoginAuth = '/api/admin/system_configs',
  updateLoginAuth = '/api/admin/system_configs',
  controlLoginAuth = '/api/admin/system_configs',
  getLogStorageApi = '/api/admin/system_configs',
  updateLogStorage = '/api/admin/system_configs',
  controlLogStorage = '/api/admin/system_configs',
  getIpControl = '/api/admin/system_configs',
  updateIpControl = '/api/admin/system_configs',
  addIPAddress = '/gapi/ipfilter/add',
  getIPAddress = '/gapi/ipfilter/list',
  deleteIPAddredd = '/gapi/ipfilter/del',
  getDataBackup = '/api/admin/backup_list',
  downloadBak = '/api/admin/backup_exists',
  delBak = '/api/admin/delete_backup',
  backup_database = '/api/admin/backup_database',
  fileExist = '/api/admin/backup_exists',
  recoverDataBase = '/api/admin/recover_database'
}


/**
 * @description 获取登录鉴别次数
 */
export function getLoginAuthApi() {
  return http.request({
    url: Api.getLoginAuth,
    method: 'GET'
  })
}

/**
 * @description 更新登录鉴别次数
 */
export function updateLoginAuthApi(params: { pwdfail_time: number }) {
  return http.request({
    url: Api.updateLoginAuth,
    method: 'POST',
    params
  }, {
    successMessageText: 'saveSuc'
  })
}

/**
 * @description 控制登录鉴别开关
 */
export function controlLoginAuthApi(params: { pwdfail_time: number }) {
  return http.request({
    url: Api.controlLoginAuth,
    method: 'POST',
    params
  })
}

/**
 * @description 获取日志存储限制
 */
export function getLogStorageApi() {
  return http.request({
    url: Api.getLogStorageApi,
    method: 'GET'
  })
}

/**
 * @description 更新日志存储限制
 */
export function updateLogStorageApi(params: { log_expire: number }) {
  return http.request({
    url: Api.updateLogStorage,
    method: 'POST',
    params
  }, {
    successMessageText: 'saveSuc'
  })
}

/**
 * @description 控制日志存储开关
 */
export function controlLogStorageApi(params: { log_expire: number }) {
  return http.request({
    url: Api.controlLogStorage,
    method: 'POST',
    params
  })
}

/**
 * @description 获取ip地址段
 */
export function getIpAddressApi() {
  return http.request({
    url: Api.getIPAddress,
    method: 'GET'
  })
}

/**
 * @description 添加允许访问的ip地址
 */
export function addIpAddressApi(params: { ip_begin: string, ip_end: string }) {
  return http.request({
    url: Api.addIPAddress,
    method: 'POST',
    params
  }, {
    successMessageText: 'saveSuc'
  })
}

/**
 * @description 删除ip地址段
 */
export function deleteIpAddressApi(params: { id: number }) {
  return http.request({
    url: Api.deleteIPAddredd,
    method: 'DELETE',
    params
  }, {
    successMessageText: 'delSuc',
  })
}

/**
 * @description 获取可访问ip地址
 */
export function getIpControlApi() {
  return http.request({
    url: Api.getIpControl,
    method: 'GET'
  })
}

/**
 * @description 保存可访问ip地址
 */
export function updateIpControlApi(params: { loginauth: string }) {
  return http.request({
    url: Api.updateIpControl,
    method: "POST",
    params
  }, {
    successMessageText: 'saveSuc'
  })
}

/**
 * @description 获取数据备份列表
 */
export function getDataBackupApi() {
  return http.request({
    url: Api.getDataBackup,
    method: 'POST'
  })
}
/**
 * @description 立即备份
 */
export const backup_database = () => {
  return http.request({
    url: Api.backup_database,
    method: 'GET',
  })
}
/**
 * @description 下载备份
 */
export function downLoadBak(params: { id: number, type: string }) {
  return http.request({
    url: Api.downloadBak,
    method: 'GET',
    params
  })
}


/**
 * @description 删除备份
 */
export function deleteBak(params: { id: number }) {
  return http.request({
    url: Api.delBak,
    method: 'GET',
    params
  },
    {
      successMessageText: 'delSuc'
    })
}

/**
 * @description 检查备份存在与否
 */
export function backFileExist(params: { id: number, type: string }) {
  return http.request({
    url: Api.fileExist,
    method: 'GET',
    params
  })
}

/**
 * @description 恢复备份
 */
export function recoverDb(params: { id: number }) {
  return http.request({
    url: Api.recoverDataBase,
    method: 'GET',
    params
  })
}