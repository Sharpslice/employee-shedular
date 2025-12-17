import { Flex } from "@mantine/core"
import SlotContainer from "../../Slot/SlotContainer"
import ShiftCell from "../../Slot/Shift/ShiftCell"
import { useContext} from "react"
import { GridNavigationContext } from "../GridNavigation/GridNavigationContext"

import type { Employee } from "../../Interfaces/Employee"
import type { Day } from "../../Interfaces/Day"

import { ContextMenuContext } from "../../Slot/ContextMenu/ContextMenuProvider"
import OverrideCell from "../../Slot/Availability_override/OverrideCell"






interface DayProps{
    row:number
    index:number
    employee:Employee
    date: Day
}

function DayCell({row,index,employee,date}:DayProps){
    const {cellRefs,focusedId,setFocusedId,handleArrowKey} = useContext(GridNavigationContext)!

    const {setCoords,setActive, setSelectedCell}= useContext(ContextMenuContext)!

    const onParentFocus = (e: React.FocusEvent<HTMLDivElement>)=>{
        if(e.target === e.currentTarget){
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

    const hasShift = employee.shifts.filter((shift)=> shift.date === date.date)
    const override = employee.override.filter((override)=>override.date===date.date)
    return(
        <Flex  
            key={`${employee.id} - ${date.date}`}  
            flex={1} direction={'column'} justify={'center'}  p={5} bd={'1px solid black'} bg={'grey'} 
            tabIndex={-1}
            ref={cellRefs?.[row][index]}
            onKeyDown={(e)=>handleArrowKey?.(e.key,row!,index)}
            onContextMenu={(e)=>{
                e.preventDefault()
                console.log('hel')
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
                    {override.map((override)=>{
                        return(
                            <OverrideCell key={`override-id-${override.id}`} override={override}/>
                        )
                        
                    })}
                    
                </SlotContainer> 

            

        </Flex>
    )
}

export default DayCell