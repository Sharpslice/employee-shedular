import { Box } from "@mantine/core";
import type { Shift } from "./Interfaces/Shift";
import TimeRangePicker from "./TimeRangePicker/TimeRangePicker";

interface CellProps{
    shift?:Shift
}


function Cell({shift}:CellProps){


    return(
    <>
        
        <Box bd={'1px solid black'} >

            <TimeRangePicker shift={shift}/>

        </Box>
        

       
    
    
    </>)
}

export default Cell;