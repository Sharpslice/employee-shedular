import { Flex } from "@mantine/core";
import type { Employee } from "./Interfaces/Employee";



interface EmployeeRowProps{
    employee: Employee
    children: React.ReactNode
}
function EmployeeRow({employee,children}:EmployeeRowProps){

    return(
    <>
        <Flex gap={'1rem'} >
          
            <Flex justify={'center'} align={"center"} bd={'1px solid black'} w={'8rem'}  >
                {employee.name}
            </Flex>
         
            
        <Flex gap={5} flex={1} miw={'100px'} >
            {children}
        </Flex>


        </Flex>
            


      
    
    
    </>
    
)


}

export default EmployeeRow;