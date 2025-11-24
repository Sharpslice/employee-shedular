import type { Employee } from "../Interfaces/Employee"


export const ArrayToMap=(employeeArray : Employee[] )=>{
    
    return employeeArray.reduce((acc,emp)=>{
        acc.set(emp.id,emp)
        return acc
    },new Map())

    
}