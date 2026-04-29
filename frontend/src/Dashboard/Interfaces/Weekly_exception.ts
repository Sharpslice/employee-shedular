import type { exception_time_blocks } from "./weekly_time_block";

export interface Weekly_exception{
    id:number,
    employee_weekly_availability_id:number,
    is_available:boolean,
    status: 'CONFLICT' | 'OVERRIDDEN' | null,
    time_blocks: exception_time_blocks[]
}