import {create} from 'zustand'
import type { ScheduleCell } from './Dashboard/Interfaces/ScheduleCell'
import { immer } from 'zustand/middleware/immer'
import type { Employee } from './Dashboard/Interfaces/Employee'
import type { Day } from './Dashboard/Interfaces/Day'

type ScheduleStore = {
    //a list of employee rows
    //each row has an employee id, composed of a list of dates where each date contains a schedule cell
    dateRange: Day[]

    scheduleGrid: Map<number,Map<string,ScheduleCell>>

    setGrid: (grid: Map<number, Map<string, ScheduleCell>>) => void
    setCell: (employee_id: number, date: string, cell: ScheduleCell) => void
}


export const useScheduleStore = create<ScheduleStore>()(immer((set)=>({
    dateRange: [],
    scheduleGrid: new Map(),

    setGrid: ( grid) => set(state => {
        
        state.scheduleGrid = grid
    }),

    setCell: (employee_id, date, cell) => set(state => {
        state.scheduleGrid.get(employee_id)?.set(date, cell)
    }),
    
})))
