import type { TimeBlock } from "./TimeBlock"




export interface Availability{
    id:number,
    employee_id:number,
    day_of_week: number,
    effective_from:string,
    is_available: boolean
    time_blocks: TimeBlock[]
}