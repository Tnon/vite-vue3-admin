interface option {
    title: string
    num?: number
    handledAttack?: number
    handledRisk?: number,
    prob_msg?: string
    heal_msg?: string
    handledAmsg?: string
    handledRmsg?: string
}
type types = 'attack' | 'risk' | 'ops'
export type staticData = Record<types, option>