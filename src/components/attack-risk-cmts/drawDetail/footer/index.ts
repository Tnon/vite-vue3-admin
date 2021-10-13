/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-05 15:21:13
 * @LastEditTime: 2021-08-08 16:17:02
 */
import drawFooter from './index.vue'
const getTabs = () => {
    const typesAttack: Items[] = [
        {
            title: 'arcomn.attackSrcMsg',
            type: 'srcInfo'
        },
        {
            title: 'arcomn.attackedInfo',
            type: 'dstInfo'
        },
        {
            title: 'arcomn.attackRecord',
            type: 'timeLine'
        }
    ]
    const typesRisk: Items[] = [
        {
            title: 'arcomn.riskMsg',
            type: 'srcInfo'
        },
        {
            title: 'arcomn.riskRecord',
            type: 'timeLine'
        }
    ]
    const typesRiskNotimeline: Items[] = [
        {
            title: 'arcomn.riskMsg',
            type: 'srcInfo'
        },
    ]
    return { typesAttack, typesRisk, typesRiskNotimeline }
}

export { getTabs }
export default drawFooter