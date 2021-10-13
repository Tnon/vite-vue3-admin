/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-13 14:20:24
 */
import { reactive } from "vue";

export const installDesc = reactive({
  Windows: [
    {
      step: 'winOne'
    },
    {
      step: 'winTwo'
    },
    {
      step: 'winThree'
    }
  ],
  Linux: [
    {
      step: 'linOne',
      children: [
        {
          label: 'method',
          value: '在官网直接下载软件二进制安装文件：<br>（文件格式：MemProtectAgent_x86_linux64_V3.0.12xx.xxx_beta(buildxxxxx).bin）'
        },
        {
          label: 'method',
          value: '采取wget方式下载软件二进制安装文件：<br>wget 下载地址 （文件格式：MemProtectAgent_x86_linux64_V3.0.12xx.xxx_beta(buildxxxxx).bin）'
        },
      ]
    },
    {
      step: 'linTwo',
      children: [
        {
          value: '在root 帐户下执行以下命令：<br>文件执行授权 （chmod +x MemProtectAgent_x86_linux64_V3.0.12xx.xxx_beta(buildxxxxx).bin） <br> 执行安装文件（./MemProtectAgent_x86_linux64_V3.0.12xx.xxx_beta(buildxxxxx).bin -r xxx.xx.x.x -p xxxx -g<分组id> ）'
        },
      ]
    },
    {
      step: 'linThree',
    }
  ]
})