import { Flex, Group, Text } from "@mantine/core"
import type { TimeBlock } from "../../Interfaces/TimeBlock"

import type { Employee } from "../../Interfaces/Employee"
import TimeRangePicker from "../../Slot/TimeRangePicker/TimeRangePicker"
import { createAvailabilityOverride } from "../../../services/overrideServices"
import type { Day } from "../../Interfaces/Day"
import type { OvTimeBlock } from "../../Interfaces/OvTimeBlock"

import { DateTime } from "luxon"
import type { availability_weekly_time_blocks } from "../../Interfaces/weekly_time_block"


interface AvailabilityProps{
    availability:TimeBlock[],
    override:OvTimeBlock[]
    employee:Employee,
    date:Day
    weekly:availability_weekly_time_blocks[]
}
const convertTo12hr = (time:string | null)=>{
    
    if(!time) return ""
    const dt = DateTime.fromISO(time)
    return dt.toFormat('hh:mm a')
}

function AvailabilityCell({availability,employee,date,override,weekly}:AvailabilityProps){
  
   
    //console.log(`${employee.name} : ${override}`)
    const time_blocks  = availability.length ? availability: [null];
    
    
    return(
        <>
            {
                <Flex direction={'column'}
                 flex={1}
                       
                        justify={'center'}  
                        bg={`${employee.color}`}  
                        bd={'1px solid black'} 
                >
                   
                    {
                       
                        weekly.length> 0 ? 
                        
                            weekly.map((time_block)=>{
                                return(
                                     <TimeRangePicker
                                    data={time_block}
                                    bg="yellow"
                                    onChange={(time,slot)=>createAvailabilityOverride(time,slot,employee.id,date.date,null)}
                                    
                                    />
                                )
                            })
                        
                        
               
                        :




                        time_blocks.map((time_block)=>{
                           
                            return(
                               <TimeRangePicker
                                    data={time_block}
                                    onChange={(time,slot)=>createAvailabilityOverride(time,slot,employee.id,date.date,time_block)}
                                    
                                    />
                            )
                        })
                    }
                </Flex>
            
            
            }
        </>
    )
}

export default AvailabilityCell