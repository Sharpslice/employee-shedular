import { ActionIcon, Flex, Text } from "@mantine/core"
import { IconAlertTriangle } from "@tabler/icons-react"
import axios from "axios"

import { DateTime } from "luxon"
import type { Shift } from "../../Interfaces/Shift"


const convertTo12hr = (time:string | null)=>{
    
    if(!time) return ""
    const dt = DateTime.fromISO(time)
    return dt.toFormat('hh:mm a')
}


interface ShiftDisplayProps{
    shift:Shift,
    hasConflict: boolean
}



function ShiftDisplay({shift,hasConflict}:ShiftDisplayProps){

    const timeOverride =async()=>{
        await axios.post(`http://localhost:3000/api/v1/overrides/`,
            {
                employee_id: shift.employee_id,
                date:shift.date,
                isAvailable: true,
                time:{
                    start_time:shift.start_time,
                    end_time: shift.end_time
                }
                
                
            },
            {withCredentials:true}
        )
    }
 
    return(
         <Flex  bg={hasConflict ? 'red' : 'green'} gap={10}>
            <Text fz={14}>{convertTo12hr( shift.start_time)}</Text>  
            <Text fz={14}>-</Text>
            <Text fz={14}>{convertTo12hr(shift.end_time)}</Text>

            {hasConflict &&
                <ActionIcon color="red" onClick={
                    (e)=>{
                        e.stopPropagation()
                        timeOverride()
                    }
                    
                    }>
                <IconAlertTriangle/>
            </ActionIcon>
            }
        </Flex>
    )
}

export default ShiftDisplay