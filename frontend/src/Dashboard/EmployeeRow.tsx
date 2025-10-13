import { Avatar, Flex, Text } from "@mantine/core";
import type { Employee } from "./Interfaces/Employee";
import React, { useState } from 'react'
import type { Day } from "./Interfaces/Day";



interface EmployeeRowProps{
    row?:number
    employee: Employee
    cellRefs?: React.RefObject<HTMLDivElement | null>[]
    handleArrowKey?:(key:string,row:number,col:number)=> void
    dateRange: Day[]
    children: React.ReactNode
  
}
function EmployeeRow({row,cellRefs,handleArrowKey,employee,dateRange,children}:EmployeeRowProps){
    const childrenArray = React.Children.toArray(children)


    const [hidden,setHidden]  = useState(true)


    const onAvailabilityclick=()=>{
        setHidden(prev=>!prev)
    }

   
    


    return(
    <>
        
        <Flex gap={'1rem'} >
          
            <Flex onClick={onAvailabilityclick} gap={10} align={'center'} bd={'1px solid black'} w={'10rem'} p={5} >
                <Avatar name={employee.name} radius={'xs'} color={"blue"}></Avatar>
                <Flex direction={'column'}>
                    <Text size="lg">{employee.name}</Text>
                    <Text size='sm'>{employee.position.toLowerCase().replace(/^\w/,c=>c.toUpperCase())}</Text>
                </Flex>
                


            </Flex>
         

            <Flex flex={1} gap={10} direction={'column'}>
                <Flex gap={5} style={{display:hidden ? "none":'flex'}}> 
                    {dateRange.map((day)=>(
                        <Flex key={day.days_of_week} bg={'green'} justify={'center'} bd={'1px solid black'} flex={1}>Available 9:00am - 1:00pm</Flex>

                    ))}
                    
                </Flex>


                <Flex  gap={5} flex={1} miw={'100px'} >
                    
                    {dateRange.map((day,index)=>(
                            <Flex key={day.date} bg={'grey'} tabIndex={0} flex={1} direction={'column'} justify={'center'}  p={5} bd={'1px solid black'}
                                ref={cellRefs?.[index]}
                                onKeyDown={(e)=>handleArrowKey?.(e.key,row!,index)}
                            >
                                

                                     {childrenArray[index]}
                                
                               
                            </Flex>
                    ))}
                
                    
                </Flex>

            </Flex>
            

        </Flex>
            


      
    
    
    </>
    
)


}

export default EmployeeRow;