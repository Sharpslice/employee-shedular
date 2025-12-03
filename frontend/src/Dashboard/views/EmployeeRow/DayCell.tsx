import { Flex } from "@mantine/core"
import SlotContainer from "../../Slot/SlotContainer"
import ShiftCell from "../../Slot/Shift/ShiftCell"
import { useContext} from "react"
import { GridNavigationContext } from "../GridNavigation/GridNavigationContext"
import type { Day } from "../../Interfaces/Day"
import type { Shift } from "../../Interfaces/Shift"
import type { Date } from "../../Interfaces/Date"
import type { Employee } from "../../Interfaces/Employee"



interface slotObj{
    date: Day
    shift: Shift | undefined
    availablility: undefined
    timeOff: undefined
}
interface DayProps{
    row:number
    index:number
    employee:Employee
    date: Date
}

function DayCell({row,index,employee,date}:DayProps){
    const {cellRefs,focusedId,setFocusedId,handleArrowKey} = useContext(GridNavigationContext)!

    

    const onParentFocus = (e: React.FocusEvent<HTMLDivElement>)=>{
        if(e.target === e.currentTarget){
            const firstSlot = cellRefs?.[row][index].current?.querySelector<HTMLDivElement>(".slot")
          
            firstSlot?.focus()
            
        }
    }

    const hasShift = employee.shifts.filter((shift)=> shift.date === date.date)
   
    return(
        <Flex  
            key={`${employee.id} - ${date.date}`}  
            flex={1} direction={'column'} justify={'center'}  p={5} bd={'1px solid black'} bg={'grey'} 
            tabIndex={-1}
            ref={cellRefs?.[row][index]}
            onKeyDown={(e)=>handleArrowKey?.(e.key,row!,index)}
            onFocus={(e)=>{
                
                onParentFocus(e)
                setFocusedId({row:row!,col:index})
            }}>
                                    
            
                <SlotContainer coords ={{row:row!,col:index}} focusedId={focusedId} employee={employee} date={date}>
                    {hasShift.map((shift)=>{
                        return(
                            <ShiftCell shift={shift}/>
                        )
                    })}
                    
                </SlotContainer> 

            

        </Flex>
    )
}

export default DayCell