import { Box, Flex } from "@mantine/core";
import type { Employee } from "./Interfaces/Employee";
import Cell from "./Cell/Cell";
import type { Date } from "./Interfaces/Date";



interface EmployeeRowProps{
    dateRange: Date[]
    employee: Employee
}
function EmployeeRow({dateRange,employee}:EmployeeRowProps){
    console.log(dateRange)
    return(
    <>
       
        <Flex>
            
                <Box bd={'1px solid black'} w={'5rem'} >
                    {employee.name}
                </Box>
            
            
            <Flex flex={1} miw={'100px'} >
                {dateRange.map((date)=>{

                    const shift = employee.shifts?.find((schedule)=>schedule.date === (date.date))
                    return(
                        <Cell date={date.date} employee={employee} shift={shift}/>
                    )


                })}
            </Flex>


        </Flex>
            


      
    
    
    </>
    
)


}

export default EmployeeRow;