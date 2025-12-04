import type { Override } from "./Override"
import type { Shift } from "./Shift"

export interface Employee{
    id:number,
    name: string
    isWorking: boolean
    position: string
    shifts: Shift[]
    availability : []
    override : Override[]
}