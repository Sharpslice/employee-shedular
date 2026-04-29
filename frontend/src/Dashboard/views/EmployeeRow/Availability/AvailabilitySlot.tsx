import { Flex } from "@mantine/core"


import type { Employee } from "../../../Interfaces/Employee"

import type { Day } from "../../../Interfaces/Day"


import { DateTime } from "luxon"


import AvailabilityTime from "./AvailabilityTime"
import type { Availability } from "../../../Interfaces/Availability"
import type { Weekly_exception } from "../../../Interfaces/Weekly_exception"





interface AvailabilityProps{
    availability:Availability,
    employee:Employee,
    date:Day
    weekly:Weekly_exception
}
const convertTo12hr = (time:string | null)=>{
    
    if(!time) return ""
    const dt = DateTime.fromISO(time)
    return dt.toFormat('hh:mm a')
}

function AvailabilitySlot({availability,employee,date,weekly}:AvailabilityProps){
  

    //console.log(`${employee.name} : ${availability}`)
    const time_blocks  = availability?.time_blocks.length ? availability.time_blocks: [null];
    //console.log(availability)

    return(
        <>
            
            <Flex key = {`${employee.id} - ${date.days_of_week}`}
                direction={'column'}
                flex={1}
                justify={'center'}  
                bg={`${employee.color}`}  
                bd={'1px solid black'}   
            >
            {
                // weekly.time_blocks.length > 0 ?
                // weekly.time_blocks.map((time_block)=>{
                //     return(
                //         <AvailabilityTime key={time_block.id} bg={'yellow'}employee={employee} date={date.date} time_block={time_block}/>
                //     )
                // })

                // : 
                time_blocks.map((time_block)=>{
                    return(
                        <AvailabilityTime  employee={employee} date={date.date} time_block={time_block}/>
                    )
                    
                })
            }
                
                
            </Flex>
        
            
            
        </>
    )
}

export default AvailabilitySlot