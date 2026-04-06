
import type { Day } from "./Day"
import type { Override } from "./Override"
import type { OvTimeBlock } from "./OvTimeBlock"
import type { Shift } from "./Shift"
import type { TimeBlock } from "./TimeBlock"

export type ScheduleCell = {
    shifts: Shift[]
    overrides: Override[]
    time_blocks: TimeBlock[] | undefined
    ov_time_blocks: OvTimeBlock[] | undefined
    day:Day
}