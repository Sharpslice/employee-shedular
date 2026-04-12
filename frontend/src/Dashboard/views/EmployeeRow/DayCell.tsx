import { Flex } from "@mantine/core"
import SlotContainer from "../../Slot/SlotContainer"
import ShiftCell from "../../Slot/Shift/ShiftCell"
import { useContext} from "react"
import { GridNavigationContext } from "../GridNavigation/GridNavigationContext"

import type { Employee } from "../../Interfaces/Employee"
import type { Day } from "../../Interfaces/Day"

import { ContextMenuContext } from "../../Slot/ContextMenu/ContextMenuProvider"

import { useDroppable } from "@dnd-kit/core"

import { mergeRefs } from "@react-aria/utils";



import axios from "axios"
import { useScheduleStore } from "../../../scheduleStore"
import OverrideCell from "../../Slot/Override/OverrideCell"
import AvailabilityCell from "./AvailabilityCell"



interface DayProps{
    row:number
    hidden:boolean
    index:number
    employee:Employee
    date: Day
    
}

function DayCell({row,index,hidden,employee,date}:DayProps){
    const {cellRefs,focusedId,setFocusedId,handleArrowKey,setMenuOpened,clipboard} = useContext(GridNavigationContext)!
    //console.log(employee)
    const {isOver,setNodeRef} = useDroppable({
        id:`(${row},${index})`,
        data:{
            employee_id:employee.id,
            employee_name: employee.name,
            date:date
            
        }

    })

    const {setCoords,setActive, setSelectedCell}= useContext(ContextMenuContext)!


    const scheduleCell = useScheduleStore(state=>state.scheduleGrid.get(employee.id)?.get(date.date))!
    const availability = scheduleCell.availability_time_blocks;
    
    
    const onParentFocus = (e: React.FocusEvent<HTMLDivElement>)=>{
        
        if(e.target === e.currentTarget){
            setMenuOpened(false)
            const firstSlot = cellRefs?.[row][index].current?.querySelector<HTMLDivElement>(".slot")
            const overrideSlot = cellRefs?.[row][index].current?.querySelector<HTMLDivElement>("input")
            if(firstSlot){
                
                firstSlot?.focus()
            }
            else if(overrideSlot){
                
                overrideSlot?.focus()
            
            }
            
            
        }
    }
    

    const createCell=async ()=>{
        console.log('creating cell')
        console.log(date)
        console.log(clipboard?.start_time)
        console.log(clipboard?.end_time)
        if(!clipboard) return
        await axios.post(`http://localhost:3000/api/v1/employees/${employee.id}/shifts/`,
            {date:date.date,
            start_time: clipboard?.start_time,
            end_time: clipboard?.end_time

            },
            {withCredentials:true})
    }
    

    return(
        <>
        <Flex flex={1} direction={'column'} align='stretch'>

        
            {!hidden && <AvailabilityCell employee={employee}  availability={availability} date={date}></AvailabilityCell>}

            <Flex  
                ref={mergeRefs(cellRefs[row][index], setNodeRef as React.Ref<HTMLDivElement>)}
                style={{opacity:availability.length ? 1:0.5}}
                key={`${employee.id} - ${date.date}`}  
                flex={1} direction={'column'} align={'stretch'}   p={5} bd={'1px solid black'} bg={'grey'} 
                
                tabIndex={-1}
                onKeyDown={(e)=>{
                    if(e.key === 'ArrowUp' || 
                        e.key==='ArrowDown' || 
                        e.key ==='ArrowLeft' || 
                        e.key ==='ArrowRight' || 
                        e.key ==='Tab')
                    {
                        handleArrowKey?.(e.key,row!,index)
                    }
                    
                    
                    if(e.key === 'v' && (e.ctrlKey || e.metaKey)){
                        console.log('droppable: ', isOver)
                        console.log('pasting: ',clipboard)
                        createCell()


                    }
                
                
                }}
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
                        scheduleCell.overrides.map((override)=>{
                            return(
                                <OverrideCell override={override} status={override.status} key={`${override.id}-${index}`}></OverrideCell>
                            )
                        })
                        
                    }
                    {
                        
                        scheduleCell.shifts.map((shift,index)=>{
                            const status = null;
                            return(
                                <ShiftCell key={`${shift.id}-${index}`} shift={shift} status={status}/>
                            
                            )
                        
                        })
                        
                    }
                
                    
                    
                </SlotContainer> 

                

            </Flex>
            </Flex>
        </>
    )
    
}

export default DayCell