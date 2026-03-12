import { Flex } from "@mantine/core";

import {  useContext, useState } from "react";
import TimeRangePicker from "../TimeRangePicker/TimeRangePicker";

import axios from "axios";
import type { Shift } from "../../Interfaces/Shift";
import { useDraggable } from "@dnd-kit/core";
import { AuthenticatedUser } from "../../../AuthenticatedUserContext";
import ShiftDisplay from "./ShiftDisplay";



export type ShiftStatus = 'conflict' | 'override' | 'allowed'

interface ShiftCellProps{
    shift:Shift,
    status: ShiftStatus
}


function ShiftCell({shift,status}:ShiftCellProps){

    const isUserAdmin = useContext(AuthenticatedUser)?.role === 'ADMIN'
    
   

    const [activate,setActivate] = useState(false)

    const deleteShift = async()=>{
        await axios.delete(`http://localhost:3000/api/v1/shifts/${shift?.id}`,{withCredentials:true})
    }
    
    const {attributes,listeners,setNodeRef,transform,isDragging} = useDraggable({
        id: shift.id,
        data:{
            employee_id: shift.employee_id,
            date: shift.date
        }
    })

    const style = {
        width: '100%',
    height: 50,
    background: "tomato",
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.8 : 1,
    boxShadow: isDragging ? "0 5px 15px rgba(0,0,0,0.3)" : "none",
    zIndex: isDragging ? 999 : "auto",
    cursor: isDragging ? "grabbing" : "grab",
    }

    return (
    
        <Flex 
            ref={isUserAdmin ? setNodeRef : undefined}   
            {...(isUserAdmin ? listeners : {})}         
            {...(isUserAdmin ? attributes : {})}   
            style={style}
            className="slot" 
            tabIndex={0} flex={1}  
            onKeyDown={(e)=>{
                if(!isUserAdmin) return
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
                if(!isUserAdmin) return
                setActivate(true)


            }}
            onBlur={(e)=>{

                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setActivate(false)
                }


            }}
       
       
        
        bg={'blue'} justify={'center'} align={'center'} gap={12} mih={38} h='100%' bd={'1px solid black'} > 
            
          {activate 
            ? <TimeRangePicker shift={shift}/> 
            : <ShiftDisplay shift={shift} status={status} />
                
          }


        </Flex>
    


    
    )
}

export default ShiftCell;