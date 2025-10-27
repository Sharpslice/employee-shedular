import { Flex } from "@mantine/core";
import type { Employee } from "../../Interfaces/Employee";
import React, { useState } from 'react'
import type { Day } from "../../Interfaces/Day";

import EmployeeInfo from "./EmployeeInfo";
import EmployeeAvailabilityRow from "./EmployeeAvailabilityRow";
import { EmployeeProvider } from "../EmployeeContext";

import type { Shift } from "../../Interfaces/Shift";
import SlotContainer from "../../Slot/SlotContainer";
import ShiftCell from "../../Slot/Shift/ShiftCell";
import { useOutletContext } from "react-router-dom";


interface slotObj{
    date: Day
    shift: Shift | undefined
    availablility: undefined
    timeOff: undefined
}

interface EmployeeRowProps{
    row?:number
    employee: Employee
    cellRefs?: React.RefObject<HTMLDivElement | null>[]
    focusedId: {row:number,col:number}
    setFocusedId: React.Dispatch<React.SetStateAction<{row:number,col:number}>>
    handleArrowKey?:(key:string,row:number,col:number)=> void
    gridCellArray : slotObj[]
  
}
function EmployeeRow({row,cellRefs,focusedId,setFocusedId,handleArrowKey,employee,gridCellArray}:EmployeeRowProps){

    const {dateRange} = useOutletContext<{safeView: ('week' | 'day'),dateRange:Day[] }>();
    const [hidden,setHidden]  = useState(true)
    const onAvailabilityclick= () => setHidden(prev=>!prev)
       
    

    return(
        <Flex gap={'1rem'} >
          
            <EmployeeInfo onAvailabilityclick={onAvailabilityclick} employee={employee}/>
         

            <Flex flex={1} gap={10} direction={'column'}>
                
                <EmployeeAvailabilityRow hidden={hidden} dateRange={dateRange}/>

                <Flex  gap={5} flex={1} miw={'100px'} >
                    {gridCellArray.map((slot,index)=>{
                        return(
                            <Flex   key={slot.date.date} bg={'grey'} tabIndex={0} flex={1} direction={'column'} justify={'center'}  p={5} bd={'1px solid black'}
                                    ref={cellRefs?.[index]}
                                    onKeyDown={(e)=>handleArrowKey?.(e.key,row!,index)}
                                    onFocus={()=>{
                                        setFocusedId({row:row!,col:index})
                                    }}>
                                    
                                <EmployeeProvider value={{employee:employee, date:slot.date, shift: slot.shift}}>

                        
                                        <SlotContainer coords ={{row:row!,col:index}} focusedId={focusedId}>
                                            {slot.shift && <ShiftCell/>}
                                            
                                        </SlotContainer>
                                

                                    {/* {!week && day && <DayViewCell>
                                        <SlotContainer>
                                            {slot.shift && <ShiftCell/>}
                                        </SlotContainer>
                                    </DayViewCell>} */}
                                    


                                </EmployeeProvider>                   



                             
                               
                            </Flex>
                    )})}
                </Flex>

            </Flex>
            

        </Flex>
            


      
    
    
        
)


}

export default EmployeeRow;