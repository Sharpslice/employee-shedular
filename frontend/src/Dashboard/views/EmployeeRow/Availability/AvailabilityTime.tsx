import { Flex } from "@mantine/core"

import TimeRangePicker from "../../../Slot/TimeRangePicker/TimeRangePicker"
import type { Employee } from "../../../Interfaces/Employee"
import { createAvailabilityOverride } from "../../../../services/overrideServices"
import type { TimeBlock } from "../../../Interfaces/TimeBlock"

import AvailabilityDisplay from "./AvailabilityDisplay"
import { useState } from "react"
import { deleteWeeklyAvailabilityException } from "../../../../services/availabilityServices"
import type { exception_time_blocks } from "../../../Interfaces/weekly_time_block"
interface props{
    employee:Employee
    time_block:TimeBlock | null | exception_time_blocks
    date:string
    bg?:string
}
function AvailabilityTime({employee,date,time_block,bg}:props){
    const [activate,setActivate] = useState(false)
    return(
        <Flex bg={bg} tabIndex={-1}
            onClick={()=>{
                setActivate(true)
            }}
            onBlur={(e)=>{
                 if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setActivate(false)
                }
            }}
            onKeyDown={(e)=>{
                 if(e.key ==='Backspace' || e.key ==='Delete'){
                    console.log('Delete')
                    if(!time_block) return
                    deleteWeeklyAvailabilityException(employee.id,time_block.id)
                }
            }}

            
        >
             
                       
               { activate ?
                
                <TimeRangePicker
                    key={`availability- ${employee.id}`}
                    data={time_block}
                    onChange={(time,slot)=>createAvailabilityOverride(time,slot,employee.id,date,time_block)}
                    
                />
                : <AvailabilityDisplay time_block={time_block}/> }
                                 
                               
                               
                            
                        
            




        </Flex>



    )
}

export default AvailabilityTime


