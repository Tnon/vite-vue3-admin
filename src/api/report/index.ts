/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-30 10:06:32
 * @LastEditTime: 2021-10-12 15:40:34
 */
import http from '@/utils/http/axios';
import { FormState } from './model'
enum Api {
  getReportList = '/api/admin/replist',
  getSubList = '/api/admin/sublist',
  addReport = '/api/admin/repstore',
  reportList = '/api/admin/selrep',
  addSubForm = '/api/admin/substore',
  delReportSubList = '/api/admin/subdel',
  delReportManaList = '/api/admin/repdel'
}

/**
 * @description 获取报表管理列表
 */
export function getReportListApi(params: { search_data: string }) {
  return http.request({
    url: Api.getReportList,
    method: 'POST',
    params
  })
}
/**
 * @description 新增报表
 */
export function addReportListApi(params: { repname: string, id?: number, [key: string]: any }) {
  return http.request({
    url: Api.addReport,
    method: 'POST',
    params
  }, {
    successMessageText: params.id ? 'repModSuc' : 'repAddSuc'
  })
}
/**
 * @description 批量/单 删除报表订阅
 */
export function delSubReport(params: { subidarr: number[] }) {
  return http.request({
    url: Api.delReportSubList,
    method: 'POST',
    params
  }, {
    successMessageText: 'delSuc'
  })
}
/**
 * @description 批量/单 删除报表管理
 */
export function delManaReport(params: { repidarr: number[] }) {
  return http.request({
    url: Api.delReportManaList,
    method: 'POST',
    params
  }, {
    successMessageText: 'delSuc'
  })
}
/**
 * @description 获取报表下拉
 */
export function getReportOptions() {
  return http.request({
    url: Api.reportList,
    method: 'GET',
  })
}
/**
 * @description 获取报表订阅列表
 */
export function getSubListApi(params: { search_data: string }) {
  return http.request({
    url: Api.getSubList,
    method: 'POST',
    params
  })
}
/**
 * @description 添加报表订阅
 */
export function addFormSub(params: FormState) {
  return http.request({
    url: Api.addSubForm,
    method: 'POST',
    params
  },
    {
      successMessageText: params.id ? 'repSucModSuc' : 'repSucAddSuc'
    })
}
