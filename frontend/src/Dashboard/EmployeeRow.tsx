import { Flex } from "@mantine/core";
import type { Employee } from "./Interfaces/Employee";
import React from 'react'


interface EmployeeRowProps{
    employee: Employee
    children: React.ReactNode
}
function EmployeeRow({employee,children}:EmployeeRowProps){
    const childrenArray = React.Children.toArray(children)
    return(
    <>
        <Flex gap={'1rem'} >
          
            <Flex justify={'center'} align={"center"} bd={'1px solid black'} w={'8rem'}  >
                {employee.name}
            </Flex>
         
           
            <Flex gap={5} flex={1} miw={'100px'} >
                
                {childrenArray.map((child)=>{
                    return(
                       <>
                        {child}
                       </>
                    )
                })}
               
                
            </Flex>


        </Flex>
            


      
    
    
    </>
    
)


}

export default EmployeeRow;