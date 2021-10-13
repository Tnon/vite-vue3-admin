/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-17 11:42:43
 * @LastEditTime: 2021-08-24 10:45:10
 */
import { bytesLength } from '@/utils/tools'
const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
const TelReg = /^0\d{2,3}-\d{7,8}$/
const PhoneReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
const emailServerTeg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/

// ip
const validateIp = (_, value) => {
    if (ipReg.test(value) && value) {
        return Promise.resolve()
    }
    return Promise.reject()
}
//邮箱
const validateEmail = (_, value) => {
    if (emailReg.test(value) && value) {
        return Promise.resolve()
    }
    return Promise.reject()

}
//邮箱服务器
const validateEmailServer = (_, value) => {
    if (emailServerTeg.test(value) && value) {
        return Promise.resolve()
    }
    return Promise.reject()

}
//电话号码

const validatePhoneOrTh = (_, value) => {
    const Reg = /^\d[-|0-9]{3,15}\d$/
    if (Reg.test(value) && value) {
        return Promise.resolve()
    }
    if (!value) {
        return Promise.resolve()
    }
    return Promise.reject()
}
//座机
const validateTel = (_, value) => {
    if (TelReg.test(value) && value) {
        return Promise.resolve()
    }
    if (!value) {
        return Promise.resolve()
    }
    return Promise.reject()
};
//手机号
const validatePhone = (_, value) => {
    if (PhoneReg.test(value) && value) {
        return Promise.resolve()
    }
    return Promise.reject()
};
//标签
const ValidateTag = (_, value) => {
    if (bytesLength(value) > 15 || !value) {
        return Promise.reject()
    }
    return Promise.resolve()
}
//管理中心地址/域名
const ValidateAddress = (_, value) => {
    const validateIp =
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    const validateDomain =
        /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
    if ((!validateIp.test(value) && !validateDomain.test(value)) || !value) {
        return Promise.reject()
    }
    return Promise.resolve()
}
//端口
const ValidatePort = (_, value) => {
    const reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
    if (!reg.test(value)) {
        return Promise.reject()
    }
    return Promise.resolve()
}
//文件黑白名单名字
const validatePolicyName = (_, value) => {
    if (bytesLength(value.replace(/\s*/g, "")) > 64 || !value) {
        return Promise.reject()
    }
    return Promise.resolve()
};
//文件黑白名单标记
const validateRemark = (_, value) => {
    if (bytesLength(value.replace(/\s*/g, "")) > 200) {
        return Promise.reject()
    }
    return Promise.resolve()
};
//md5 
const validateMd5 = (_, value) => {
    const md5Reg = /^[0-9A-Za-z]{32}$/;
    if (!md5Reg.test(value)) {
        return Promise.reject()
    }
    return Promise.resolve()
};
//sha1
const validateSha1 = (_, value) => {
    const sha1Reg = /^[0-9A-Za-z]{40}$/;
    if (!sha1Reg.test(value)) {
        return Promise.reject()
    }
    return Promise.resolve()
};
//s空校验
const validateNone = (_, value) => {

    return Promise.resolve()
};

const validateCertificate = (_, value) => {
    const ctfReg = /^[0-9A-Za-z]{40}$/;
    if (value) {
        if (!ctfReg.test(value)) {
            return Promise.reject()
        } else {
            return Promise.resolve()
        }
    }
    return Promise.resolve()

};
export {
    emailReg,
    validateEmail,
    validateTel,
    validatePhone,
    ValidateTag,
    validateIp,
    ValidateAddress,
    ValidatePort,
    validateSha1,
    validatePolicyName,
    validateRemark,
    validateMd5,
    validateNone,
    validateCertificate,
    validateEmailServer,
    validatePhoneOrTh
}