import { Box } from "@mantine/core";
import type { Shift } from "./Interfaces/Shift";
import TimeRangePicker from "./TimeRangePicker/TimeRangePicker";
import { useState } from "react";

interface CellProps{
    shift?:Shift
}


function Cell({shift}:CellProps){

    
    return(
    <>
        
        <Box tabIndex={0} bd={'1px solid black'} onKeyDown={(e)=>{if(e.key==='Enter') console.log('pressed')}} >
            
           <TimeRangePicker shift={shift}/> 

        </Box>
        

       
    
    
    </>)
}

export default Cell;