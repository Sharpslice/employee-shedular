import {create} from 'zustand'
import type { ScheduleCell } from './Dashboard/Interfaces/ScheduleCell'
import { immer } from 'zustand/middleware/immer'
import type { Employee } from './Dashboard/Interfaces/Employee'
import type { Day } from './Dashboard/Interfaces/Day'
import type { Shift } from './Dashboard/Interfaces/Shift'
import { enableMapSet } from "immer"
enableMapSet()
type ScheduleStore = {
    //a list of employee rows
    //each row has an employee id, composed of a list of dates where each date contains a schedule cell
    dateRange: Day[]

    employees: Employee[]

    scheduleGrid: Map<number,Map<string,ScheduleCell | null>>

    setDateRange:(dateRange:Day[]) => void
    setEmployees:(employees:Employee[])=>void
    setGrid: (grid: Map<number, Map<string, ScheduleCell |null>>) => void
    setCell: (employee_id: number, date: string, cell: ScheduleCell) => void

    addShift:(employee_id:number,date:string,shift:Shift) =>void
    removeShift:(employee_id:number,date:string,shift_id:number)=>void
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
   addShift: (employee_id, date, shift) =>
  set(state => {
    const scheduleCell = state.scheduleGrid.get(employee_id)?.get(date);
    if (!scheduleCell) return;

    // Check if the shift already exists by unique id
    const exists = scheduleCell.shifts.some(s => s.id === shift.id);

    if (!exists) {
      scheduleCell.shifts.push(shift);
    }
  }),
    removeShift: (employee_id, date, shift_id) =>

  set(state => {
    //console.log(employee_id)
    const scheduleCell = state.scheduleGrid.get(employee_id)?.get(date);
    //console.log('scheedule',scheduleCell)
    if (!scheduleCell) return;
    console.log('removing shift',shift_id)
    // Remove the shift if it exists (idempotent)
    scheduleCell.shifts = scheduleCell.shifts.filter(s => s.id !== shift_id);
  }),
    
})))
