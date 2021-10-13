/**
 * @description: 防护状态
 */


export enum Pstatus {
    LANJIE = 'LANJIEStatus',
    WHITE = 'WHITEStatus',
    BLACK = 'BLACKStatus',
    SBAO = 'SBAOStatus',
    UNHANDLE = 'UNHANDLEStatus',
    CLEAR = 'CLEARStatus'
}
/**
 * @description: 攻击等级
 */
export enum Alevel {
    HIGH = 'arcomn.highAttack',
    MID = 'arcomn.midAttack',
    LOW = 'arcomn.lowAttack',
}
/**
 * @description: 风险等级
 */
export enum Rlevel {
    HIGH = 'arcomn.highRisk',
    MID = 'arcomn.midRisk',
    LOW = 'arcomn.lowRisk',
}
