import { Box } from "@mantine/core";
import type { Shift } from "./Interfaces/Shift";
import TimeRangePicker from "./TimeRangePicker/TimeRangePicker";
import {useState } from "react";
import type { Employee } from "./Interfaces/Employee";

interface CellProps{
    shift?:Shift
    employee: Employee
    date: string
}


function Cell({date,employee,shift}:CellProps){

    const [isFocused,setIsFocused] = useState(false)

    

    return(
    <>
        
        <Box tabIndex={0}  
            onKeyDown={(e)=>{if(e.key==='Enter' || e.key===' ') setIsFocused(true)} } 
            // onClick={()=>{setIsFocused(prev=>!prev)}}
            bd={'1px solid black'} >
            
            
            {isFocused ? <TimeRangePicker setIsFocused={setIsFocused} date={date }employee={employee} shift={shift}/>: shift ? <Box ta={'center'}>{shift.start_time}</Box > : <Box ta={'center'}>--:-- --</Box>}



        </Box>
        

       
    
    
    </>)
}

export default Cell;