export interface FormState {
    emails: string[]
    id?: string
    month: string[]
    name: string
    round: 'month' | 'week'
    select: number
    week: string[]
}