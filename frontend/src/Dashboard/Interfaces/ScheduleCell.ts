

import type { Availability } from "./Availability"
import type { Override } from "./Override"

import type { Shift } from "./Shift"
import type { Weekly_exception } from "./Weekly_exception"



export type ScheduleCell = {
    shifts: Shift[]
    overrides: Override[]
    weekly_availability: Weekly_exception
    availabilities:Availability
    
}