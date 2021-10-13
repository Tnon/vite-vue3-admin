/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-07-23 09:47:32
 */
import sha256 from 'js-sha256'
import { isArray, isObject } from '@/utils/is/';
export function setStateToUrl(obj: object, pro_key: string = ''): object {

  for (let key in obj) {
    if (isArray(obj[key])) {
      if (obj[key].length === 1) {
        if (!isObject(obj[key][0])) {
          obj[key] = obj[key][0]
        }
      } else {
        if (obj[key].length) {
          if (!isObject(obj[key][0])) {
            obj[key] = obj[key].join(',')
          }
        } else {
          obj[key] = obj[key].join(',')
        }

      }

    }
    if (pro_key === 'filter' && obj[key] === '') {
      delete obj[key]
    }
    if (isObject(obj[key])) {
      setStateToUrl(obj[key], key)
    }
  }
  return obj
}
export const pCompile = (code) => {
  var hash = sha256.sha256(code);
  return hash;
}

export const compileStr = code => {
  let c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return c;
}
