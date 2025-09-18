import { Box } from "@mantine/core";
import type { Shift } from "../Interfaces/Shift";

import {useState } from "react";
import type { Employee } from "../Interfaces/Employee";
import TimeRangePicker from "./TimeRangePicker/TimeRangePicker";

import ShiftCell from "./Shift/ShiftCell";
import Placeholder from "./Placeholder";

import style from './Slot.module.css'

interface CellProps{
    shift?:Shift
    employee: Employee
    date: string
}


function Slot({date,employee,shift}:CellProps){

    if(shift){
        return (
            <Box  className={style.focusBox}   w={'100%'} >
                <ShiftCell shift={shift}/>
            
        
            </Box>
        )
    }

     
    
}

export default Slot;