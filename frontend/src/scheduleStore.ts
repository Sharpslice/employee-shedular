import {create} from 'zustand'
import type { ScheduleCell } from './Dashboard/Interfaces/ScheduleCell'
import { immer } from 'zustand/middleware/immer'
import type { Employee } from './Dashboard/Interfaces/Employee'
import type { Day } from './Dashboard/Interfaces/Day'

type ScheduleStore = {
    //a list of employee rows
    //each row has an employee id, composed of a list of dates where each date contains a schedule cell
    dateRange: Day[]

    employees: Employee[]

    scheduleGrid: Map<number,Map<string,ScheduleCell | null>>

    setDateRange:(dateRange:Day[]) => void
    setEmployees:(employees:Employee[])=>void
    setGrid: (grid: Map<number, Map<string, ScheduleCell | null>>) => void
    setCell: (employee_id: number, date: string, cell: ScheduleCell) => void
}


export const useScheduleStore = create<ScheduleStore>()(immer((set)=>({
    dateRange: [],
    employees:[],
    scheduleGrid: new Map(),


    setDateRange:(dateRange)=> set(state=>{
        state.dateRange = dateRange
    }),

    setEmployees:(employees)=> set(state=>{
        state.employees = employees
    }),
    setGrid: ( grid) => set(state => {
        
        state.scheduleGrid = grid
    }),

    setCell: (employee_id, date, cell) => set(state => {
        state.scheduleGrid.get(employee_id)?.set(date, cell)
    }),
    
})))
