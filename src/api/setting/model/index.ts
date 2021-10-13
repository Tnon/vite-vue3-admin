/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-20 11:46:49
 * @LastEditTime: 2021-08-26 09:20:29
 */
export interface FilterState {
  agent_version: string | undefined
  status: string | undefined
  groups: string
  ip: string
  osver: string | undefined
}

export interface syslogParams {
  acc_risk: boolean
  app_risk: boolean
  assets: boolean
  assets_hour: string
  assets_minute: string
  assets_option: string
  bha_log: boolean
  doc_risk: boolean
  ip: string
  ker_risk: boolean
  logSwitch: boolean
  mem_risk: boolean
  network: string
  port: string
  pro_risk: false
  threat_risk: false
  weeks: string[]
}

interface emailConfig {
  mail_encryption: string
  mail_from_name: string
  mail_host: string
  mail_password: string
  mail_port: string
  mail_username: string
}
export interface emailConfigParams {
  smtp: emailConfig
}