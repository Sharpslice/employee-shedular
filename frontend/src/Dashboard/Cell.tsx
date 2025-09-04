import { Box } from "@mantine/core";
import type { Shift } from "./Interfaces/Shift";
import TimeRangePicker from "./TimeRangePicker/TimeRangePicker";
import { useEffect, useRef, useState } from "react";

interface CellProps{
    shift?:Shift
}


function Cell({shift}:CellProps){

    const [isFocused,setIsFocused] = useState(false)

    

    return(
    <>
        
        <Box tabIndex={0}  
            onKeyDown={(e)=>{if(e.key==='Enter') setIsFocused(true)} } 
            //onBlur={()=>{setIsFocused(false)}}
            bd={'1px solid black'} >
            
            
            {isFocused ? <TimeRangePicker setIsFocused={setIsFocused} shift={shift}/>: shift ? <Box ta={'center'}>{shift.start_time}</Box > : <Box ta={'center'}>--:-- --</Box>}



        </Box>
        

       
    
    
    </>)
}

export default Cell;