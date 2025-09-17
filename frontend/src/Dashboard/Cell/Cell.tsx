import { Box } from "@mantine/core";
import type { Shift } from "../Interfaces/Shift";

import {useState } from "react";
import type { Employee } from "../Interfaces/Employee";
import TimeRangePicker from "./TimeRangePicker/TimeRangePicker";

import ShiftCell from "./Shift/ShiftCell";
import Placeholder from "./Placeholder";

import style from './Cell.module.css'
import axios from "axios";
interface CellProps{
    shift?:Shift
    employee: Employee
    date: string
}


function Cell({date,employee,shift}:CellProps){

    const [isFocused,setIsFocused] = useState(false)

     
    return(
    <>
        
        <Box  className={style.focusBox}   w={'100%'} tabIndex={0}  
            onKeyDown={(e)=>{
                    if(e.key==='Enter' || e.key===' ') {setIsFocused(true)}
                    
                } 
            
            } 
            onDoubleClick={()=>{setIsFocused(prev=>!prev)}}
             >
            
            
            {isFocused ? <TimeRangePicker setIsFocused={setIsFocused} date={date }employee={employee} shift={shift}/>
            : shift ? <ShiftCell shift={shift}/>  : <Placeholder/>}

        </Box>
        

       
    
    
    </>)
}

export default Cell;