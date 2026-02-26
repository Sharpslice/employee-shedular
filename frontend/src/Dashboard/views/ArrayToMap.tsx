import type { Availability } from "../Interfaces/Availability"
import type { Employee } from "../Interfaces/Employee"
import type { Override } from "../Interfaces/Override"
import type { Shift } from "../Interfaces/Shift"
import type { TimeBlock } from "../Interfaces/TimeBlock"


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

export const AvailabilityArrayToMap=(AvailabilityArray : Availability[] )=>{
    
    return AvailabilityArray.reduce((acc,availability)=>{
        acc.set(availability.id,availability)
        return acc
    },new Map())

    
}

export const OverrideToMap=(overrideArray: Override[])=>{
    return overrideArray.reduce((acc,override)=>{
        acc.set(override.id,override)
        return acc
    },new Map())
}

export const TimeBlockArrayToMap=(timeBlockArray: TimeBlock[] )=>{

    return timeBlockArray.reduce((acc,time_block)=>{
        acc.set(time_block.id,time_block)
        return acc
    },new Map())

    
}