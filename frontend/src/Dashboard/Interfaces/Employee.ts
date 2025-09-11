import type { Shift } from "./Shift"

export interface Employee{
    id:number,
    name: string
    shifts: Shift[]
}