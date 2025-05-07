export interface ResponseDataInterface {
    help: string
    success: boolean
    result: Result
  }
  
  export interface Result {
    distinct: boolean
    fields: Field[]
    filters: Filters
    include_total: boolean
    limit: number
    offset: number
    q: string
    records_format: string
    resource_id: string
    sort: string
    total_estimation_threshold: any
    records: Record[]
    _links: Links
    total: number
    total_was_estimated: boolean
  }
  
  export interface Field {
    id: string
    type: string
  }
  
  export interface Filters {
    YeshuvKod: number
  }
  
  export interface Record {
    FictiveIDNumber: string
  }
  
  export interface Links {
    start: string
    next: string
  }
  