import { Flex } from "@mantine/core"
import SlotContainer from "../../Slot/SlotContainer"
import ShiftCell from "../../Slot/Shift/ShiftCell"
import { useContext} from "react"
import { GridNavigationContext } from "../GridNavigation/GridNavigationContext"
import type { Day } from "../../Interfaces/Day"
import type { Shift } from "../../Interfaces/Shift"



interface slotObj{
    date: Day
    shift: Shift | undefined
    availablility: undefined
    timeOff: undefined
}
interface DayProps{
    row:number
    index:number
    slot:slotObj
}

function DayCell({row,index,slot}:DayProps){
    const {cellRefs,focusedId,setFocusedId,handleArrowKey} = useContext(GridNavigationContext)!

    

    const onParentFocus = (e: React.FocusEvent<HTMLDivElement>)=>{
        if(e.target === e.currentTarget){
            const firstSlot = cellRefs?.[row][index].current?.querySelector<HTMLDivElement>(".slot")
          
            firstSlot?.focus()
            
            
        }
    }
   
    return(
        <Flex  
            key={slot.date.date}  
            flex={1} direction={'column'} justify={'center'}  p={5} bd={'1px solid black'} bg={'grey'} 
            tabIndex={-1}
            ref={cellRefs?.[row][index]}
            onKeyDown={(e)=>handleArrowKey?.(e.key,row!,index)}
            onFocus={(e)=>{
                
                onParentFocus(e)
                setFocusedId({row:row!,col:index})
            }}>
                                        
            
              <SlotContainer   coords ={{row:row!,col:index}} focusedId={focusedId}>
                    {slot.shift && <ShiftCell/>}
                   
                </SlotContainer> 

            

        </Flex>
    )
}

export default DayCell