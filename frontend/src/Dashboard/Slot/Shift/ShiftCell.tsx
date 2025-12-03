import { Flex, Text } from "@mantine/core";

import {DateTime} from 'luxon'
import {  useState } from "react";
import TimeRangePicker from "../TimeRangePicker/TimeRangePicker";

import axios from "axios";
import type { Shift } from "../../Interfaces/Shift";



const convertTo12hr = (time:string | null)=>{
    if(!time) return ""
    const dt = DateTime.fromFormat(time,'HH:mm:ss');
    return dt.toFormat('hh:mm a')
}

function ShiftCell({shift}:{shift:Shift}){

    

    const start_time = convertTo12hr(shift!.start_time)
    const end_time = convertTo12hr(shift!.end_time)

    const [activate,setActivate] = useState(false)

    const deleteShift = async()=>{
        await axios.delete(`http://localhost:3000/api/employee/shift/${shift?.id}/delete`)
    }
    
    return (
    
        <Flex className="slot" tabIndex={0} flex={1}  onKeyDown={(e)=>{
            if(e.key ==='Backspace' || e.key ==='Delete'){
                console.log('Delete')
                deleteShift()
            }
            else if (e.key===' ' || e.key ==='Enter'){
                console.log('space')
                setActivate(prev=>!prev)
            }


        }}
        onClick={()=>{



        }}
        onBlur={(e)=>{

            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setActivate(false)
            }


        }}
       
       
        
        bg={'blue'} justify={'center'} align={'center'} gap={12} mih={38} h='100%' bd={'1px solid black'} > 
            
          {activate ? <TimeRangePicker/> :
            <>
                <Text fz={14}>{start_time}</Text>  
                <Text fz={14}>-</Text>
                <Text fz={14}>{end_time}</Text>
            </>
          
          }


        </Flex>
    


    
    )
}

export default ShiftCell;