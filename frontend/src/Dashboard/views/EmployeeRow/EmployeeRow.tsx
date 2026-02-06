import { Flex } from "@mantine/core";
import type { Employee } from "../../Interfaces/Employee";
import {  createContext, useContext, useState } from 'react'
import type { Day } from "../../Interfaces/Day";

import EmployeeInfo from "./EmployeeInfo";
import EmployeeAvailabilityRow from "./EmployeeAvailabilityRow";


import { ContextMenuContext } from "../../Slot/ContextMenu/ContextMenuProvider";


import { useOutletContext } from "react-router-dom";

import DayCell from "./DayCell";
import type { Shift } from "../../Interfaces/Shift";
import type { Availability } from "../../Interfaces/Availability";
import { DateTime } from "luxon";



interface EmployeeRowProps{
    row?:number
    employee: Employee
    shifts: Shift[]
    availabilities: Availability[]
}
function EmployeeRow({row,employee,shifts,availabilities}:EmployeeRowProps){

    const {dateRange} = useOutletContext<{safeView: ('week' | 'day'),dateRange:Day[] }>();
    const {setActive} = useContext(ContextMenuContext)!
    const [hidden,setHidden]  = useState(true)
    const onAvailabilityclick= () => setHidden(prev=>!prev)

    const calculateTime = (start:string,end:string)=>{
        const startDt = DateTime.fromISO(start)
        const endDt = DateTime.fromISO(end)
        if(!startDt.isValid || !endDt.isValid){
            return 0;
        }

        const diff = endDt.diff(startDt,['hours']);
        
        return Number(diff.as('hours').toFixed(2)) 
    }   

    const totalHours = shifts.reduce((total,shift)=>{
        return total + calculateTime(shift.start_time,shift.end_time)
    },0)
    

    return(
       

        
        <Flex onClick={()=>setActive(false)} gap={'1rem'} >
          
            <EmployeeInfo onAvailabilityclick={onAvailabilityclick} employee={employee} totalHours = {totalHours}/>
         
            <Flex flex={1} gap={10} direction={'column'}>
                
                <EmployeeAvailabilityRow hidden={hidden} dateRange={dateRange} availability={availabilities}/>

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