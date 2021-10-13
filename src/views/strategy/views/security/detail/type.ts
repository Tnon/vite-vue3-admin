/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-29 09:41:17
 * @LastEditTime: 2021-09-30 17:53:19
 */
export interface CardState {
    pth: boolean,
    ip: number,
    ipList: string[],
    account: number,
    accountList: string[],
}

export const FTypes = [
    {
        type: 'windows',
        title: 'common.windows'
    },
    {
        type: 'linux',
        title: 'common.linux'
    }
]
export interface Nodes {
    label: string
    key: string
    msg: string
    switch: boolean
    radio: boolean
    unintercept?: boolean
    switchVs?: {
        checkedValue: string
        unCheckedValue: string
    }
}
interface NodesType {
    windows: {
        [key: string]: Nodes[]
    },
    linux: {
        [key: string]: Nodes[]
    }
}
export const useFormTypes = (t): NodesType => {
    return {
        windows: {
            riskTypes: [
                {
                    label: t('menu.attack'),
                    key: "attack",
                    msg: "<span style='color:#18BA79'>" + t('strategy.twoWeeks') + "</span><br>" + t('strategy.attMsg'),
                    switch: false,
                    radio: true,

                },
                {
                    label: t('menu.risk'),
                    key: "risk",
                    msg: "<span style='color:#18BA79'>" + t('strategy.twoWeeks') + "</span><br>" + t('strategy.rikMsg'),
                    switch: false,
                    radio: true,
                },
            ],
            publicPro: [
                {
                    label: t('strategy.riskBhv'),
                    key: "behavior",
                    msg: "<span style='color:#18BA79'>" + t('strategy.recOn') + "</span><br>" + t('strategy.genCap'),
                    switch: true,
                    radio: true,
                    switchVs: {
                        checkedValue: '2',
                        unCheckedValue: '0'
                    }
                },
                {
                    label: t('strategy.accRiskDet'),
                    key: "accrisk",
                    msg: "<span style='color:#18BA79'>" + t('strategy.recOn') + "</span><br>" + t('strategy.weakPwdMsg'),
                    switch: true,
                    radio: true,
                    switchVs: {
                        checkedValue: '2',
                        unCheckedValue: '0'
                    }
                },
                {
                    label: t('strategy.pupProDe'),
                    key: "puppet",
                    msg: "<span style='color:#18BA79'>" + t('strategy.recOn') + "</span><br>" + t('strategy.pupMsg'),
                    switch: true,
                    radio: false,
                    switchVs: {
                        checkedValue: '1',
                        unCheckedValue: '0'
                    }
                },
                {
                    label: t('strategy.memWebDe'),
                    key: "memwebshell",
                    msg: "<span style='color:#18BA79'>" + t('strategy.recOn') + "</span><br>" + t('strategy.jsvaPhpMsg'),
                    switch: true,
                    radio: false,
                    switchVs: {
                        checkedValue: '1',
                        unCheckedValue: '0'
                    }

                },
                {
                    label: t('strategy.rookDe'),
                    key: "rootkit",
                    msg: "<span style='color:#18BA79'>" + t('strategy.recOn') + "</span><br>" + t('strategy.rookMsg'),
                    switch: true,
                    radio: false,
                    switchVs: {
                        checkedValue: '1',
                        unCheckedValue: '0'
                    }
                }
            ],
            domain: [
                {
                    label: t('strategy.goldPro'),
                    key: "goldtick",
                    msg: "<span style='color:#18BA79'>" + t('strategy.onlyDoma') + "</span><br>" + t('strategy.krbtgMsg'),
                    switch: true,
                    radio: false,
                    switchVs: {
                        checkedValue: '1',
                        unCheckedValue: '0'
                    }
                },
                {
                    label: t('strategy.lsassPro'),
                    key: "lsass",
                    msg: "<span style='color:#18BA79'>" + t('strategy.onlyDoma') + "</span><br>" + t('strategy.sassMsg'),
                    switch: true,
                    radio: false,
                    switchVs: {
                        checkedValue: '1',
                        unCheckedValue: '0'
                    }
                },
                {
                    label: t('strategy.domLogRe'),
                    key: "dlog",
                    msg: "<span style='color:#18BA79'>" + t('strategy.onlyDoma') + "</span><br>" + t('strategy.domlogMsg'),
                    switch: true,
                    radio: false,
                    switchVs: {
                        checkedValue: '1',
                        unCheckedValue: '0'
                    }
                },
                {
                    label: t('strategy.netloPep'),
                    key: "netlogon",
                    msg: "<span style='color:#18BA79'>" + t('strategy.onlyDoma') + "</span><br>" + t('strategy.netLogMsg'),
                    switch: true,
                    radio: false,
                    switchVs: {
                        checkedValue: '1',
                        unCheckedValue: '0'
                    }
                }
            ],
            emergency: [
                {
                    label: t('strategy.injMod'),
                    key: "driinj",
                    msg: "<span style='color:#18BA79'>" + t('strategy.closeCare') + "</span><br>" + t('strategy.funCloMsg'),
                    switch: true,
                    radio: false,
                    switchVs: {
                        checkedValue: '1',
                        unCheckedValue: '0'
                    }
                },
                // {
                //     label: "启用Agent自保护",
                //     key: "agtpro",
                //     msg: "eabmsgicon",
                //     switch: true,
                //     radio: false,
                //     switchVs: {
                //         checkedValue: '1',
                //         unCheckedValue: '0'
                //     }
                // }
            ]
        },
        linux: {
            riskTypes: [
                {
                    label: t('menu.attack'),
                    key: "attack",
                    msg: "<span style='color:#18BA79'>" + t('strategy.twoWeeks') + "</span><br>" + t('strategy.attMsg'),
                    switch: false,
                    radio: true,
                },
                {
                    label: t('menu.risk'),
                    key: "risk",
                    msg: "<span style='color:#18BA79'>" + t('strategy.twoWeeks') + "</span><br>" + t('strategy.rikMsg'),
                    switch: false,
                    radio: true,
                },
            ],
            publicPro: [
                {
                    label: t('strategy.riskBhv'),
                    key: "behavior",
                    msg: "<span style='color:#18BA79'>" + t('strategy.recOn') + "</span><br>" + t('strategy.rebShelMsg'),
                    switch: true,
                    radio: false,
                    switchVs: {
                        checkedValue: '1',
                        unCheckedValue: '0'
                    }
                },
                {
                    label: t('strategy.accRiskDet'),
                    key: "accrisk",
                    msg: "<span style='color:#18BA79'>" + t('strategy.recOn') + "</span><br>" + t('strategy.weakPwdMsg'),
                    switch: true,
                    radio: true,
                    unintercept: true,
                    switchVs: {
                        checkedValue: '2',
                        unCheckedValue: '0'
                    }
                },
                {
                    label: t('strategy.memWebDe'),
                    key: "memwebshell",
                    msg: "<span style='color:#18BA79'>" + t('strategy.recOn') + "</span><br>" + t('strategy.jsvaPhpMsg'),
                    switch: true,
                    radio: false,
                    switchVs: {
                        checkedValue: '1',
                        unCheckedValue: '0'
                    }
                },
                {
                    label: t('strategy.rookDe'),
                    key: "rootkit",
                    msg: "<span style='color:#18BA79'>" + t('strategy.recOn') + "</span><br>" + t('strategy.rookMsg'),
                    switch: true,
                    radio: false,
                    switchVs: {
                        checkedValue: '1',
                        unCheckedValue: '0'
                    }
                }
                // {
                //   label: "backshell",
                //   switchvalue: false,
                //   key: "backshell",
                //   msg: "bslmsgicon"
                // }
            ],
            driveModel: [
                {
                    label: t('strategy.injMod'),
                    key: "driinj",
                    msg: "<span style='color:#18BA79'>" + t('strategy.closeCare') + "</span><br>" + t('strategy.funCloMsg'),
                    switch: true,
                    radio: false,
                    switchVs: {
                        checkedValue: '1',
                        unCheckedValue: '0'
                    }
                },
                {
                    label: t('strategy.agentSelfP'),
                    key: "agtpro",
                    msg: "<span style='color:#18BA79'>" + t('strategy.closeCare') + "</span><br>" + t('strategy.agentMsg'),
                    switch: true,
                    radio: false,
                    switchVs: {
                        checkedValue: '1',
                        unCheckedValue: '0'
                    }
                }
            ]
        }
    }
}
