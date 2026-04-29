import { Flex } from "@mantine/core";
import type { Employee } from "../../Interfaces/Employee";
import {  useContext, useState } from 'react'
import EmployeeInfo from "./EmployeeInfo";
import { ContextMenuContext } from "../../Slot/ContextMenu/ContextMenuProvider";
import DayCell from "./DayCell";

import { useScheduleStore } from "../../../scheduleStore";


interface EmployeeRowProps{
    row:number
    employee: Employee
 
}
function EmployeeRow({row,employee}:EmployeeRowProps){

  
    const {setActive} = useContext(ContextMenuContext)!
    const [hidden,setHidden]  = useState(true)
    const onAvailabilityclick= () => setHidden(prev=>!prev)

    const dateRange = useScheduleStore(state=>state.dateRange)

    if(!dateRange) return
    return(        
    <Flex onClick={()=>setActive(false)} gap={'1rem'} >
        
        <EmployeeInfo onAvailabilityclick={onAvailabilityclick} employee={employee}/>
        
        <Flex flex={1} gap={10} direction={'column'}>
            
            {/* <EmployeeAvailabilityRow    
                employee={employee}
                hidden={hidden} 
                dateRange={dateRange} 
            /> */}

            <Flex gap={5} flex={1} miw={'100px'} h={'75px'}  >
                {dateRange.map((date,index)=>{
                    return(
                        <DayCell 
                            key={`${employee.id}-${date.date}`} 
                            hidden={hidden} 
                            row={row} 
                            index={index}
                            employee={employee} 
                            date={date} 
                            
                        />
                    )
                })}
                            
                
            </Flex>
            
            

        </Flex>
        

    </Flex>
    
        
        


    


    
)


}

export default EmployeeRow;