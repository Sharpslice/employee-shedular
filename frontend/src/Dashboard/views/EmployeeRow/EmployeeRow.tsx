import { Flex } from "@mantine/core";
import type { Employee } from "../../Interfaces/Employee";
import {  useContext, useMemo, useState } from 'react'
import type { Day } from "../../Interfaces/Day";

import EmployeeInfo from "./EmployeeInfo";
import EmployeeAvailabilityRow from "./EmployeeAvailabilityRow";


import { ContextMenuContext } from "../../Slot/ContextMenu/ContextMenuProvider";


import { useOutletContext } from "react-router-dom";

import DayCell from "./DayCell";
import type { Shift } from "../../Interfaces/Shift";

import { DateTime } from "luxon";
import type { TimeBlock } from "../../Interfaces/TimeBlock";


//type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
interface EmployeeRowProps{
    row:number
    employee: Employee
    shifts: Shift[]
    time_blocks_DOW: Map<number,TimeBlock[] >
}
function EmployeeRow({row,employee,shifts,time_blocks_DOW}:EmployeeRowProps){

    const {dateRange} = useOutletContext<{safeView: ('week' | 'day'),dateRange:Day[],av_time_blocks:Map<number,TimeBlock> }>();
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

    const totalHours = useMemo(()=>{
      return shifts.reduce((total,shift)=> total + calculateTime(shift.start_time,shift.end_time) ,0)
    },[shifts])



    

    
    
    

    return(        
        <Flex onClick={()=>setActive(false)} gap={'1rem'} >
          
            <EmployeeInfo onAvailabilityclick={onAvailabilityclick} employee={employee} totalHours = {totalHours}/>
         
            <Flex flex={1} gap={10} direction={'column'}>
                
                <EmployeeAvailabilityRow hidden={hidden} dateRange={dateRange} time_blocks_DOW={time_blocks_DOW} />

                <Flex gap={5} flex={1} miw={'100px'} >
                    {dateRange.map((date,index)=>{
                        
                        const time_blocks = time_blocks_DOW.get(date.days_of_week)
                        
                        return(
                            
                            <DayCell 
                                key={`${employee.id}-${date.date}`} 
                                row={row} 
                                employee={employee} 
                                shifts={shifts} 
                                date={date} 
                                index={index}
                                time_blocks={time_blocks}
                            />
                        )
                    })}
                                
                    
                </Flex>
              
                

            </Flex>
            

            </Flex>
        
            
            


      
    
    
        
)


}

export default EmployeeRow;