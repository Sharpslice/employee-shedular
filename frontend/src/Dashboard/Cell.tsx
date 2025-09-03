import { Box } from "@mantine/core";
import type { Shift } from "./Interfaces/Shift";
import TimeRangePicker from "./TimeRangePicker/TimeRangePicker";

interface CellProps{
    schedule:Shift
}


function Cell({schedule}:CellProps){


    return(
    <>
        
        <Box bd={'1px solid black'} >
            <TimeRangePicker/>


        </Box>
        

       
    
    
    </>)
}

export default Cell;