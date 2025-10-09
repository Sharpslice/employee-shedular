
import type { Shift } from "../Interfaces/Shift";


import type { Employee } from "../Interfaces/Employee";



interface CellProps{
    shift?:Shift
    employee: Employee
    date: string
}


function Slot({date,employee,shift}:CellProps){

    return null;

     
    
}

export default Slot;