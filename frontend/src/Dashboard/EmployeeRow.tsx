import { Box, Card, Flex } from "@mantine/core";
import type { Employee } from "./Interfaces/Employee";



interface EmployeeRowProps{
    employee: Employee
    children: React.ReactNode
}
function EmployeeRow({employee,children}:EmployeeRowProps){

    return(
    <>
        <Flex gap={'1rem'} >
          
            <Box bd={'1px solid black'} w={'5rem'} >
                {employee.name}
            </Box>
            
            
            
            
            <Flex flex={1} miw={'100px'} >
                {children}
            </Flex>


        </Flex>
            


      
    
    
    </>
    
)


}

export default EmployeeRow;