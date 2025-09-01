import { Box } from "@mantine/core";
import type { Employee } from "./Interfaces/Employee";
import type { Day } from "./Interfaces/Day";

interface CellProps{
    Employee: Employee
    date: Day
}


function Cell({Employee,date}:CellProps){


    return(
    <>
    <Box  flex={1} bd={'1px solid black'} ta={'center'}>
        {Employee.id}
        {date.day_of_month}

    </Box>
    
    
    </>)
}

export default Cell;