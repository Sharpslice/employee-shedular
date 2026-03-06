import { Flex } from "@mantine/core"
import SlotContainer from "../../Slot/SlotContainer"
import ShiftCell from "../../Slot/Shift/ShiftCell"
import { useContext} from "react"
import { GridNavigationContext } from "../GridNavigation/GridNavigationContext"

import type { Employee } from "../../Interfaces/Employee"
import type { Day } from "../../Interfaces/Day"

import { ContextMenuContext } from "../../Slot/ContextMenu/ContextMenuProvider"
// import OverrideCell from "../../Slot/Availability_override/OverrideCell"
import { useDroppable } from "@dnd-kit/core"

import { mergeRefs } from "@react-aria/utils";
import type { Shift } from "../../Interfaces/Shift"
import { DateTime } from "luxon"

import type { TimeBlock } from "../../Interfaces/TimeBlock"
import type { OvTimeBlock } from "../../Interfaces/OvTimeBlock"
import { getShiftStatus } from "./shiftConflictUtil"
import type { Override } from "../../Interfaces/Override"
import OverrideCell from "../../Slot/Override/OverrideCell"






interface DayProps{
    row:number
    index:number
    employee:Employee
    date: Day
    shifts:Shift[]
    overrides:Override[]
    time_blocks: TimeBlock[] | undefined
    ov_time_blocks: OvTimeBlock[] | undefined
}

function DayCell({row,index,employee,date,shifts,overrides,time_blocks,ov_time_blocks}:DayProps){
    const {cellRefs,focusedId,setFocusedId,handleArrowKey,setMenuOpened} = useContext(GridNavigationContext)!

    const {setCoords,setActive, setSelectedCell}= useContext(ContextMenuContext)!

    const hasShift = shifts.filter(shift => DateTime.fromISO(shift.date).toISODate() === DateTime.fromISO(date.date).toISODate());
    const hasOverride = overrides.filter(override => DateTime.fromISO(override.date).toISODate()=== DateTime.fromISO(date.date).toISODate())
    const onParentFocus = (e: React.FocusEvent<HTMLDivElement>)=>{
        
        if(e.target === e.currentTarget){
            setMenuOpened(false)
            const firstSlot = cellRefs?.[row][index].current?.querySelector<HTMLDivElement>(".slot")
            const overrideSlot = cellRefs?.[row][index].current?.querySelector<HTMLDivElement>(".overrideSlot")
            if(firstSlot){
                firstSlot?.focus()
            }
            else{
                overrideSlot?.focus()
            
            }
            
            
        }
    }
    
    const {isOver,setNodeRef} = useDroppable({
        id:`(${row},${index})`,
        data:{
            employee_id:employee.id,
            employee_name: employee.name,
            date:date
            
        }

    })

    
  
    

    return(
        <Flex  
            ref={mergeRefs(cellRefs[row][index], setNodeRef as React.Ref<HTMLDivElement>)}
            style={{opacity:isOver ? 1:0.5}}
            key={`${employee.id} - ${date.date}`}  
            flex={1} direction={'column'} justify={'center'}  p={5} bd={'1px solid black'} bg={'grey'} 
            tabIndex={-1}
            onKeyDown={(e)=>handleArrowKey?.(e.key,row!,index)}
            onContextMenu={(e)=>{
                e.preventDefault()
                setActive(true)
                setCoords({x:e.clientX,y:e.clientY})
                setSelectedCell({employee:employee,date:date})


            }}
            onFocus={(e)=>{
                onParentFocus(e)
                setFocusedId({row:row!,col:index})
            }}>
                                    
            
            <SlotContainer coords ={{row:row!,col:index}} focusedId={focusedId} employee={employee} date={date}>
                {
                    hasOverride.map((override,index)=>{
                        if(override.type === 'AVAILABLE') return null;
                        return(
                            <OverrideCell override_type ={override.type} key={`${override.id}-${index}`}></OverrideCell>
                        )
                    })
                }
                {
                    hasShift.map((shift,index)=>{
                        const status = getShiftStatus(shift, time_blocks,ov_time_blocks);
                        return(
                            <ShiftCell key={`${shift.id}-${index}`} shift={shift} status={status}/>
                        )
                    })
                }
               
                
                
            </SlotContainer> 

            

        </Flex>
    )
}

export default DayCell