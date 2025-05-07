export interface RequestDdata {
    resource_id: string
    filters: Filters
    q: string
    distinct: boolean
    limit: number
    offset: number
    fields: string[]
    sort: string
    include_total: boolean
    records_format: string
}

export interface Filters {
    YeshuvKod: number
}
