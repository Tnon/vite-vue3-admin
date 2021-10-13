import router from '@/router'
import { unref } from 'vue';
import { createStorage } from '@/utils/Storage'
import { AxiosCanceler } from '@/utils/http/axios/axiosCancel'
import http from '@/utils/http/axios';
const storage = createStorage()
export const datedifference = (sDate1: string, sDate2: string): number => { //sDate1和sDate2是2006-12-18格式
    if (!sDate1 || !sDate2) {
        return 0
    }
    let dateSpan,
        iDays;
    let arr = sDate1.split('');
    arr.splice(4, 0, '-');
    arr.splice(7, 0, '-');
    sDate1 = arr.join('');

    let arr2 = sDate2.split('');
    arr2.splice(4, 0, '-');
    arr2.splice(7, 0, '-');
    sDate2 = arr2.join('');
    let sDate1N = Date.parse(sDate1);
    let sDate2N = Date.parse(sDate2);
    dateSpan = sDate2N - sDate1N;
    // dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays + 1;
};
//字符长度
export const bytesLength = value => {
    let count = value.replace(/\s*/g, "").length
    for (let i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 255) {
            count++;
        }
    }
    return count;
}

export const getQueryValue = (type: string): string => {
    return unref(router.currentRoute).query[type] as string ?? undefined
}
/**
 * 密码强度校验
 * @param {string} sValue 
 * @param {string} email
 */
export const checkStrong = (sValue: string, email: string): any => {
    let modes = {
        low: false,
        middle: false,
        high: false,
        level: 0
    };
    //正则表达式验证符合要求的
    if (sValue.length < 1) {
        return modes;
    }
    if (/^[\s\S]{8,20}$/.test(sValue)) {
        modes.low = true; //8-20
        modes.level++
    }
    if (/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{0,}/.test(sValue)) {
        modes.middle = true; //字母数字特殊符合
        modes.level++
    }
    if (sValue.indexOf(email) < 0 || email == '') {
        modes.high = true; //大写  
        modes.level++
    }
    return modes;
}

//退出登录，清空
export const Logout = () => {
    router.replace({
        name: 'login',
    })
    storage.clear()
    // window.location.reload()
}
export const removeAllPending = () => {
    const axiosCanceler = new AxiosCanceler()
    axiosCanceler.removeAllPending()
}
//格式化
export const preendTrim = arr => {
    let newa: any = [];
    arr.forEach(ele => {
        ele = ele.trim();
        if (ele && newa.indexOf(ele) < 0) {
            newa.push(ele)
        }
    });
    return newa
}

/**
   * 根据os判断系统类型
   * @param {Function} 执行函数
   * @param {Number} delay 延时ms  
   */
export const osLogoType = (oslow, online) => {
    let typesrc, os;
    if (oslow) {
        os = oslow.toUpperCase().replace(/\s+/g, "");
    } else {
        os = 'LINUX'
    }

    if (os.indexOf('WINDOWS') > -1) {
        //windows
        typesrc = '#ax-os-win'
    } else if (os.indexOf("CENTOS") > -1) {
        //centos
        typesrc = '#ax-os-CentOs'
    } else if (os.indexOf("DEBIAN") > -1) {
        //DEBIAN
        typesrc = '#ax-os-Debain'
    } else if (os.indexOf("FEDORA") > -1) {
        //fedora
        typesrc = '#ax-os-fedora'
    } else if (os.indexOf("KYLIN") > -1) {
        //NeoKylin
        typesrc = '#ax-os-NeoKylin'
    } else if (os.indexOf("SUSE") > -1 || os.indexOf("SLES") > -1) {
        // suse
        typesrc = '#ax-os-Suse'
    } else if (os.indexOf("UBUNTU") > -1) {
        // ubuntu
        typesrc = '#ax-os-Ubuntu'
    } else if (os.indexOf("UOS") > -1) {
        // ubuntu
        typesrc = '#ax-os-UOS'
    } else if (os.indexOf("REDFLAG") > -1) {
        // ubuntu
        typesrc = '#ax-os-RedFlag'
    } else if (os.indexOf("REDHAT") > -1) {
        //redhat
        typesrc = '#ax-os-RedHat'
    } else if (os.indexOf("DEEPIN") > -1) {
        //deepin
        typesrc = '#ax-os-deepin'
    } else {
        //其他暂时linux
        typesrc = '#ax-os-Linux'
    }
    if (online === false) {
        typesrc = typesrc + 'off'
    }
    return typesrc
}
//获取当前时间字符串文件名
export const getNowDate = arudate => {
    const date = new Date(arudate);
    const YY = date.getFullYear();
    const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    const DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    const hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    const mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    const ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

    return '' + YY + MM + DD + hh + mm + ss;
}
//导出excel文件
export const exportExcel = (url, params: { filter: any }) => {
    return new Promise((resolve, reject) => {
        http.request({
            method: 'POST',
            url,
            params,
            responseType: 'blob' // 表明返回服务器返回的数据类型
        }).then(
            response => {
                if (!response) {
                    return
                }
                let type, fileName;
                if (response.type.indexOf('zip') > -1) {
                    type = 'application/zip';
                    fileName = getNowDate(new Date()) + '.zip';
                } else {
                    type = 'application/vnd.ms-excel';
                    fileName = getNowDate(new Date()) + '.xlsx';
                }
                resolve(response)
                let blob = new Blob([response], {
                    type
                })
                if ((window.navigator as any).msSaveOrOpenBlob) {
                    (navigator as any).msSaveBlob(blob, fileName)
                } else {
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob)
                    link.download = fileName
                    link.click()
                    //释放内存
                    window.URL.revokeObjectURL(link.href)
                }
            },
            err => {
                reject(err)
            }
        )
    })
}