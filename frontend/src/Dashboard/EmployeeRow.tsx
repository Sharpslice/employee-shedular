import { Box, Flex } from "@mantine/core";
import type { Employee } from "./Interfaces/Employee";
import Cell from "./Cell/Cell";
import type { Date } from "./Interfaces/Date";



interface EmployeeRowProps{
    dateRange: Date[]
    employee: Employee
    children: React.ReactNode
}
function EmployeeRow({dateRange,employee,children}:EmployeeRowProps){
    console.log(dateRange)
    return(
    <>
       
        <Flex>
            
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