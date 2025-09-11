import { Flex } from "@mantine/core";
import type { Employee } from "./Interfaces/Employee";




interface EmployeeBoardProps{
    employeeList: Employee[]
    
}

function EmployeeBoard({employeeList}:EmployeeBoardProps){
    


  

    
    return(
        <>
        <Flex justify={'center'} direction={'column'}>
           
        </Flex>
        </>
    )
}

export default EmployeeBoard;