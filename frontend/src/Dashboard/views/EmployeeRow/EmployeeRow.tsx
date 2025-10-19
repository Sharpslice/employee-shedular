import { Avatar,Flex, Text } from "@mantine/core";
import type { Employee } from "../../Interfaces/Employee";
import React, { useState } from 'react'
import type { Day } from "../../Interfaces/Day";
import SlotContainer from "../../Slot/SlotContainer";
import EmployeeInfo from "./EmployeeInfo";
import EmployeeAvailabilityRow from "./EmployeeAvailabilityRow";



interface EmployeeRowProps{
    row?:number
    employee: Employee
    cellRefs?: React.RefObject<HTMLDivElement | null>[]
    slotRefs?: React.RefObject<HTMLDivElement | null>[]
    handleArrowKey?:(key:string,row:number,col:number)=> void
    dateRange: Day[]
    children: React.ReactNode
  
}
function EmployeeRow({row,cellRefs,handleArrowKey,employee,dateRange,children}:EmployeeRowProps){
    const childrenArray = React.Children.toArray(children)
    const [hidden,setHidden]  = useState(true)
    const onAvailabilityclick= () => setHidden(prev=>!prev)
       
    

    return(

        <Flex gap={'1rem'} >
          
            <EmployeeInfo onAvailabilityclick={onAvailabilityclick} employee={employee}/>
         

            <Flex flex={1} gap={10} direction={'column'}>
                
                <EmployeeAvailabilityRow hidden={hidden} dateRange={dateRange}/>

                <Flex  gap={5} flex={1} miw={'100px'} >
                    {dateRange.map((day,index)=>{
                        return(
                            <Flex   key={day.date} bg={'grey'} tabIndex={0} flex={1} direction={'column'} justify={'center'}  p={5} bd={'1px solid black'}
                                    ref={cellRefs?.[index]}
                                    onKeyDown={(e)=>handleArrowKey?.(e.key,row!,index)}
                                    onFocus={()=>{
                                    }}>
                                <SlotContainer>
                                    {childrenArray[index]}
                                </SlotContainer>
                               
                            </Flex>
                    )})}
                </Flex>

            </Flex>
            

        </Flex>
            


      
    
    
        
)


}

export default EmployeeRow;