import type { Employee } from "../Interfaces/Employee"
import type { Shift } from "../Interfaces/Shift"


export const EmployeeArrayToMap=(employeeArray : Employee[] )=>{
    
    return employeeArray.reduce((acc,emp)=>{
        acc.set(emp.id,emp)
        return acc
    },new Map())

    
}

export const ShiftArrayToMap=(shiftArray : Shift[] )=>{
    
    return shiftArray.reduce((acc,shift)=>{
        acc.set(shift.id,shift)
        return acc
    },new Map())

    
}