type fTypes = 'osver' | 'online' | 'secure_status'
interface fNodes {
    title: string
    class?: string
    key: string,
    countKey: string
}
export type filterDType = Record<fTypes, fNodes[]>


export type FProps = Record<fTypes, string>