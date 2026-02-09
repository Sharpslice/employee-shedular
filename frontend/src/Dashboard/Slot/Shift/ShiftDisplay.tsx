import { Flex, Text } from "@mantine/core"

import { DateTime } from "luxon"
import type { TimeBlock } from "../../Interfaces/TimeBlock"

const convertTo12hr = (time:string | null)=>{
    
    if(!time) return ""
    const dt = DateTime.fromISO(time)
    return dt.toFormat('hh:mm a')
}
const normalizeTime = (dt: DateTime) =>
  dt.set({ year: 1970, month: 1, day: 1 });



interface ShiftDisplayProps{
    start_time: string,
    end_time: string,
    time_blocks: TimeBlock[] | false
}

function ShiftDisplay({start_time,end_time,time_blocks}:ShiftDisplayProps){
    console.log('shift',time_blocks)
    const available_start = DateTime.fromISO('1970-01-01T09:00:00')
    const available_end = DateTime.fromISO('1970-01-01T18:00:00')

    const start_timeDt =normalizeTime( DateTime.fromISO(start_time))
    const end_timeDt = normalizeTime( DateTime.fromISO(end_time) )

    let conflict:boolean = false

    if(start_timeDt < available_start || end_timeDt > available_end || start_timeDt > available_end || end_timeDt <available_start){
        conflict = true
        console.log(conflict)
    }
    
    return(
         <Flex  bg={conflict ? 'red' : 'green'} gap={10}>
            <Text fz={14}>{convertTo12hr( start_time)}</Text>  
            <Text fz={14}>-</Text>
            <Text fz={14}>{convertTo12hr(end_time)}</Text>
            
        </Flex>
    )
}

export default ShiftDisplay