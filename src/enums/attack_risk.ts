/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-26 10:32:53
 * @LastEditTime: 2021-07-26 10:34:05
 */
/**
 * @description: 资产 title/placeholder/number名称
 */
export enum MODELTYPE {
    ATTACK = 1,
    RISK,
    ATTACKPATH = '/10000/',
    RISKPATH = '/10100/'
}

export enum DRAWMSG {
    srcpid = 'srcpid', //'进程id',
    srcname = 'srcname',  //'进程名',
    srcmd5 = 'srcmd5',  //'进程Md5',
    path = 'path', //'进程路径',
    sha256 = 'sha256',  //'进程Sha256',
    cmdline = 'cmdline',  //'命令行',
    isx86 = 'isx86',  //'是否x86进程',
    remoteip = 'remoteip',  //'远端IP',
    remoteport = 'remoteport',  //'远端端口',
    protocol = 'protocol',  //'使用协议',
    docname = 'docname',  //'Doc名称',
    extra = 'extra',  //'其他信息',
}