import { Flex } from "@mantine/core";

import {  useContext, useState } from "react";



import type { Shift } from "../../Interfaces/Shift";
import { useDraggable } from "@dnd-kit/core";
import { AuthenticatedUser } from "../../../AuthenticatedUserContext";
import ShiftDisplay from "./ShiftDisplay";
import { GridNavigationContext } from "../../views/GridNavigation/GridNavigationContext";
import { deleteShift, updateShiftTime } from "../../../services/shiftServices";
import TimeRangePicker from "../TimeRangePicker/TimeRangePicker";



export type ShiftStatus = 'CONFLICT' | 'OVERIDDEN' | null

interface ShiftCellProps{
    shift:Shift,
    status: ShiftStatus
}


function ShiftCell({shift}:ShiftCellProps){

    const isUserAdmin = useContext(AuthenticatedUser)?.role === 'ADMIN'
    
     const {setClipboard} = useContext(GridNavigationContext)!;

    const [activate,setActivate] = useState(false)
   
    //console.log(shift.employee_id)
    
    const {attributes,listeners,setNodeRef,transform,isDragging} = useDraggable({
        id: shift.id,
        data:{
            shift:shift
        }
    })

    const style = {
        // width: '100%',
        // height:'100%',
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
            flex={1}
            className="slot" 
            onKeyDown={(e)=>{
                
                if(e.key === 'c' && (e.ctrlKey || e.metaKey)){
                    console.log('copying ',shift)
                    setClipboard(shift)
                }

                if(!isUserAdmin) return
                if(e.key ==='Backspace' || e.key ==='Delete'){
                    console.log('Delete')
                    deleteShift(shift.id)
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
            //onFocus={()=>{console.log('currenty selecting shift')}}
            onBlur={(e)=>{

                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setActivate(false)
                }


            }}
       
       
        
        bg={'blue'} justify={'center'} align={'center'} gap={12} mih={38} h='100%' bd={'1px solid black'} > 
            
          {activate 
            ? shift && <TimeRangePicker data={shift} onChange={(time,string)=>updateShiftTime(time,string,shift)} bg="red"/>  
            : <ShiftDisplay shift={shift} />
                
          }


        </Flex>
    


    
    )
}

export default ShiftCell;