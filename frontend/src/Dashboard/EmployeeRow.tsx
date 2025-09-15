import { Avatar, Flex, Text } from "@mantine/core";
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
          
            <Flex gap={10} align={'center'} bd={'1px solid black'} w={'10rem'} p={5} >
                <Avatar name={employee.name} radius={'xs'} color={"blue"}></Avatar>
                <Flex direction={'column'}>
                    <Text size="lg">{employee.name}</Text>
                    <Text size='sm'>{employee.position.toLowerCase().replace(/^\w/,c=>c.toUpperCase())}</Text>
                </Flex>
                


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