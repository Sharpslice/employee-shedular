

import type { Override } from "./Override"
import type { OvTimeBlock } from "./OvTimeBlock"
import type { Shift } from "./Shift"
import type { TimeBlock } from "./TimeBlock"
import type { availability_weekly_time_blocks } from "./weekly_time_block"


export type ScheduleCell = {
    shifts: Shift[]
    overrides: Override[]
    availability_time_blocks: TimeBlock[]
    override_time_blocks: OvTimeBlock[]
    availability_weekly_time_blocks: availability_weekly_time_blocks[]
}