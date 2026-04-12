import { Flex } from "@mantine/core"
import type { TimeBlock } from "../../Interfaces/TimeBlock"

import type { Employee } from "../../Interfaces/Employee"
import TimeRangePicker from "../../Slot/TimeRangePicker/TimeRangePicker"
import { createAvailabilityOverride } from "../../../services/overrideServices"
import type { Day } from "../../Interfaces/Day"

function AvailabilityCell({availability,employee,date}:{availability:TimeBlock[],employee:Employee,date:Day}){
  
    //console.log(employee.name)
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
                        time_blocks.map((time_block)=>{
                            if(time_block === null) console.log('eempty')
                            return(
                               <TimeRangePicker
                                    data={time_block}
                                    onChange={(time,slot)=>createAvailabilityOverride(time,slot,employee.id,date.date)}
                                    
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