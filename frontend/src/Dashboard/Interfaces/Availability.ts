import type { TimeBlock } from "./TimeBlock"



export interface Availability{
    id:number,
    employee_id:number,
    day_of_week: number
    is_availabile: boolean
    time_block_id:number | null
    time_block: TimeBlock | null
}