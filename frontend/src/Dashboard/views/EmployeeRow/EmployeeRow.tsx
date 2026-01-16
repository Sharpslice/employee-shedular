import { Flex } from "@mantine/core";
import type { Employee } from "../../Interfaces/Employee";
import {  useContext, useState } from 'react'
import type { Day } from "../../Interfaces/Day";

import EmployeeInfo from "./EmployeeInfo";
import EmployeeAvailabilityRow from "./EmployeeAvailabilityRow";


import { ContextMenuContext } from "../../Slot/ContextMenu/ContextMenuProvider";


import { useOutletContext } from "react-router-dom";

import DayCell from "./DayCell";
import type { Shift } from "../../Interfaces/Shift";



interface EmployeeRowProps{
    row?:number
    employee: Employee
    shifts: Shift[]
}
function EmployeeRow({row,employee,shifts}:EmployeeRowProps){

    const {dateRange} = useOutletContext<{safeView: ('week' | 'day'),dateRange:Day[] }>();
    const [hidden,setHidden]  = useState(true)
    const onAvailabilityclick= () => setHidden(prev=>!prev)
       
    const {setActive} = useContext(ContextMenuContext)!
    return(
        <Flex onClick={()=>setActive(false)} gap={'1rem'} >
          
            <EmployeeInfo onAvailabilityclick={onAvailabilityclick} employee={employee}/>
         
            <Flex flex={1} gap={10} direction={'column'}>
                
                <EmployeeAvailabilityRow hidden={hidden} dateRange={dateRange}/>

                    <Flex gap={5} flex={1} miw={'100px'} >
                        {dateRange.map((date,index)=>{
                            return(
                                <DayCell key={`${employee.id}-${date}-${index}`} row={row!} employee={employee} shifts={shifts} date={date} index={index}/>
                            )
                        })}
                                    
                        
                    </Flex>
              
                

            </Flex>
            

        </Flex>
            


      
    
    
        
)


}

export default EmployeeRow;