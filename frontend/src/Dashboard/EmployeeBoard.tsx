import { Box, Flex } from "@mantine/core";
import type { Employee } from "./Interfaces/Employee";




interface EmployeeBoardProps{
    employeeList: Employee[]
    
}

function EmployeeBoard({employeeList}:EmployeeBoardProps){
    


  

    
    return(
        <>
        <Flex justify={'center'} direction={'column'}>
           {employeeList.map((employee)=>{
                return(
                    <Box >
                        {employee.name}
                    </Box>
                )
           })}
        </Flex>
        </>
    )
}

export default EmployeeBoard;