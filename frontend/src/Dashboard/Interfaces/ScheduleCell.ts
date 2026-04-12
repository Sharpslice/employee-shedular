

import type { Override } from "./Override"
import type { OvTimeBlock } from "./OvTimeBlock"
import type { Shift } from "./Shift"
import type { TimeBlock } from "./TimeBlock"

export type ScheduleCell = {
    shifts: Shift[]
    overrides: Override[]
    availability_time_blocks: TimeBlock[]
    override_time_blocks: OvTimeBlock[]
}