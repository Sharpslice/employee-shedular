import { ActionIcon, Flex, Text } from "@mantine/core"
import { IconAlertTriangle } from "@tabler/icons-react"
import axios from "axios"

import { DateTime } from "luxon"
import type { Shift } from "../../Interfaces/Shift"
import type { ShiftStatus } from "./ShiftCell"


const convertTo12hr = (time:string | null)=>{
    
    if(!time) return ""
    const dt = DateTime.fromISO(time)
    return dt.toFormat('hh:mm a')
}


interface ShiftDisplayProps{
    shift:Shift,
    status: ShiftStatus
}

const getShiftColors = (status:ShiftStatus)=>{
    switch(status){
        case "conflict":
            return 'red'
        case "override":
            return 'yellow'
        case "allowed":
            return undefined
    }
}


function ShiftDisplay({shift,status}:ShiftDisplayProps){

    const timeOverride =async()=>{
        await axios.post(`http://localhost:3000/api/v1/employees/${shift.employee_id}/overrides/`,
            {
                employee_id: shift.employee_id,
                date:shift.date,
                type: 'AVAILABLE',
                time:{
                    start_time:shift.start_time,
                    end_time: shift.end_time
                },
                shift_id:shift.id

                
                
            },
            {withCredentials:true}
        )
    }

   
    return(
         <Flex flex={1} justify={'center'} align={'center'}h={'100%'} gap={10} bg={getShiftColors(status)}  >
            <Text  fz={15}>{convertTo12hr( shift.start_time)}</Text>  
            <Text  fz={15}>-</Text>
            <Text  fz={15}>{convertTo12hr(shift.end_time)}</Text>

            {status ==='conflict' &&
                <ActionIcon color={getShiftColors(status)} onClick={
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