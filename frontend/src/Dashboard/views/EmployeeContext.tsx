import { createContext,} from "react"
import type { Date } from "../Interfaces/Date"
import type { Employee } from "../Interfaces/Employee"
import type { Shift } from "../Interfaces/Shift"

interface EmployeeContextObj{
    employee: Employee | null
    date: Date | null
    shift: Shift | null
}

interface EmployeeProviderProp{
    children: React.ReactNode
    value: EmployeeContextObj
}

const EmployeeContext = createContext<EmployeeContextObj >({employee:null,date:null,shift:null})



function EmployeeProvider({children,value}:EmployeeProviderProp){
    return(

        <EmployeeContext.Provider value={value}>
            {children}
        </EmployeeContext.Provider>


    )
   
}

export {EmployeeProvider,EmployeeContext}