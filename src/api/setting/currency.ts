import http from '@/utils/http/axios'
import { syslogParams } from './model/index'

enum Api {
  getBasicInfo = '/api/admin/system_configs',
  updateSystemConfig = '/api/admin/system_configs',
  getMonitor = '/api/admin/systeminfo',
  getSyslog = '/api/admin/getsyslog',
  updateSyslog = '/api/admin/syslog',
  updateEmailConfig = '/api/admin/mail_configs',
  getEmailConfig = '/api/admin/mail_configs',
  getEmailTest = '/api/admin/test_mail',
  alarmApi = '/api/admin/warn_config',
  setAlarmApi = '/api/admin/warn_methond',
  setSwitchpi = '/api/admin/warn_type'
}

/**
 * @description 获取登录页信息
 */
export function getBasicInfoApi() {
  return http.request({
    url: Api.getBasicInfo,
    method: 'GET'
  })
}

/**
 * @description 修改登录页信息
 */
export function updateBasicInfoApi(params: { description: string }) {
  return http.request({
    url: Api.updateSystemConfig,
    method: 'POST',
    params
  },
    {
      successMessageText: 'saveSuc'
    })
}

/**
 * @description 获取邮件设置
 */
export function getEmailConfigApi() {
  return http.request({
    url: Api.getEmailConfig,
    method: 'GET'
  })
}

/**
 * @description 修改邮箱设置
 */
// export function updateEmailConfigApi(params: emailConfigParams) {
export function updateEmailConfigApi(params) {
  return http.request({
    url: Api.updateEmailConfig,
    method: 'POST',
    params
  }, {
    successMessageText: 'saveSuc'
  })
}

/**
 * @description 邮箱验证
 */
export function getEmailTestApi(params) {
  return http.request({
    url: Api.getEmailTest,
    method: 'POST',
    params
  })
}

/**
 * @description 获取syslog信息
 */
export function getSyslogApi() {
  return http.request({
    url: Api.getSyslog,
    method: 'GET'
  })
}

/**
 * @description 修改syslog信息
 */
export function updateSyslogApi(params: syslogParams) {
  return http.request({
    url: Api.updateSyslog,
    method: 'POST',
    params
  }, {
    successMessageText: 'saveSuc'
  })
}

/**
 * @description 资源监控
 */
export function getMonitorApi() {
  return http.request({
    url: Api.getMonitor,
    method: 'GET'
  })
}
/**
 * @description 获取安全告警
 */
export function getAlarm() {
  return http.request({
    url: Api.alarmApi,
    method: 'GET'
  })
}
/**
 * @description 设置安全告警
 */
export function setAlarm(params: { email: { freq: number, accept: string[] } } | { phone: { freq: number, accept: string[] } }) {
  return http.request({
    url: Api.setAlarmApi,
    method: 'POST',
    params
  }, {
    successMessageText: 'saveSuc'
  })
}
/**
 * @description switch 开关选择
 */
export function setSwitType(params) {
  return http.request({
    url: Api.setSwitchpi,
    method: 'POST',
    params
  }, {
    successMessageText: 'setSuc'
  })
}
