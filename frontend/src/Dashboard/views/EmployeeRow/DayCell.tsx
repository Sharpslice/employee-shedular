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




interface DayProps{
    row:number
    index:number
    employee:Employee
    date: Day
    shifts:Shift[]
}

function DayCell({row,index,employee,date,shifts}:DayProps){
    const {cellRefs,focusedId,setFocusedId,handleArrowKey,setMenuOpened} = useContext(GridNavigationContext)!
    
    const {setCoords,setActive, setSelectedCell}= useContext(ContextMenuContext)!

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
    const style = {
        opacity:isOver ? 1:0.5
    }

    
     const hasShift = shifts.filter(shift => 
  DateTime.fromISO(shift.date).toISODate() === DateTime.fromISO(date.date).toISODate()
);
        
        
    
    
    //const override = employee.override.filter((override)=>override.date===date.date)
    return(
        <Flex  
            ref={mergeRefs(cellRefs[row][index], setNodeRef as React.Ref<HTMLDivElement>)}
            style={style}
            key={`${employee.id} - ${date.date}`}  
            flex={1} direction={'column'} justify={'center'}  p={5} bd={'1px solid black'} bg={'grey'} 
            tabIndex={-1}
            onKeyDown={(e)=>handleArrowKey?.(e.key,row!,index)}
            onContextMenu={(e)=>{
                e.preventDefault()
                
                setActive(true)
                console.log(e.clientX,e.clientY)
                setCoords({x:e.clientX,y:e.clientY})
                setSelectedCell({employee:employee,date:date})


            }}
            onFocus={(e)=>{
                onParentFocus(e)
                setFocusedId({row:row!,col:index})
            }}>
                                    
            
                <SlotContainer coords ={{row:row!,col:index}} focusedId={focusedId} employee={employee} date={date}>
                    {hasShift.map((shift,index)=>{
                        
                        return(
                            <ShiftCell key={`${shift.id}-${index}`} shift={shift}/>
                        )
                    })}
                    {/* {override.map((override)=>{
                        return(
                            <OverrideCell key={`override-id-${override.id}`} override={override}/>
                        )
                        
                    })} */}
                    
                </SlotContainer> 

            

        </Flex>
    )
}

export default DayCell