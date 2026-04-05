import {create} from 'zustand'
import type { ScheduleCell } from './Dashboard/Interfaces/ScheduleCell'
import { immer } from 'zustand/middleware/immer'
import type { Employee } from './Dashboard/Interfaces/Employee'

type ScheduleStore = {
    employees : Map<number,Employee>

    scheduleGrid: Map<number,Map<string,ScheduleCell>>

    setGrid: (employees: Map<number, Employee>, grid: Map<number, Map<string, ScheduleCell>>) => void
    setCell: (employee_id: number, date: string, cell: ScheduleCell) => void
}


export const useScheduleStore = create<ScheduleStore>()(immer((set)=>({
    employees: new Map(),
    scheduleGrid: new Map(),

    setGrid: (employees, grid) => set(state => {
        state.employees = employees
        state.scheduleGrid = grid
    }),

    setCell: (employee_id, date, cell) => set(state => {
        state.scheduleGrid.get(employee_id)?.set(date, cell)
    }),
    
})))
