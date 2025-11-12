import { Flex } from "@mantine/core";
import type { Employee } from "../../Interfaces/Employee";
import React, {  useState } from 'react'
import type { Day } from "../../Interfaces/Day";

import EmployeeInfo from "./EmployeeInfo";
import EmployeeAvailabilityRow from "./EmployeeAvailabilityRow";
import { EmployeeProvider } from "../EmployeeContext";

import type { Shift } from "../../Interfaces/Shift";

import { useOutletContext } from "react-router-dom";

import DayCell from "./DayCell";


interface slotObj{
    date: Day
    shift: Shift | undefined
    availablility: undefined
    timeOff: undefined
}

interface EmployeeRowProps{
    row?:number
    employee: Employee
    gridCellArray : slotObj[]
  
}
function EmployeeRow({row,employee,gridCellArray}:EmployeeRowProps){

    const {dateRange} = useOutletContext<{safeView: ('week' | 'day'),dateRange:Day[] }>();
    const [hidden,setHidden]  = useState(true)
    const onAvailabilityclick= () => setHidden(prev=>!prev)
       
    

    return(
        <Flex gap={'1rem'} >
          
            <EmployeeInfo onAvailabilityclick={onAvailabilityclick} employee={employee}/>
         
            <Flex flex={1} gap={10} direction={'column'}>
                
                <EmployeeAvailabilityRow hidden={hidden} dateRange={dateRange}/>

                
                    <Flex gap={5} flex={1} miw={'100px'} >
                        {gridCellArray.map((slot,index)=>{
                            return(
                                <EmployeeProvider key={slot.date.date} value={{employee,date:slot.date,shift:slot.shift}}>
                                    <DayCell row={row!} slot={slot} index={index}/>
                                </EmployeeProvider>
                                
                                
                        )})}
                    </Flex>
              
                

            </Flex>
            

        </Flex>
            


      
    
    
        
)


}

export default EmployeeRow;