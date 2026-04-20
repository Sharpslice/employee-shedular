import { Flex, Group, Text } from "@mantine/core"
import type { Day } from "../../Interfaces/Day"

import { DateTime } from "luxon"

import type { Employee } from "../../Interfaces/Employee"
import TimeRangePicker from "../../Slot/TimeRangePicker/TimeRangePicker"
import { createAvailabilityOverride } from "../../../services/overrideServices"

import { useScheduleStore } from "../../../scheduleStore"



interface availabilityProp{
    employee:Employee
    hidden: boolean
    dateRange: Day[]
}
const convertTo12hr = (time:string | null)=>{
    
    if(!time) return ""
    const dt = DateTime.fromISO(time)
    return dt.toFormat('hh:mm a')
}

function EmployeeAvailabilityRow({employee,hidden,dateRange}:availabilityProp){
    

    

    return(<>

        {!hidden && <Flex gap={5} >
            {dateRange.map((day)=>{

                const availability_time_block = useScheduleStore.getState().scheduleGrid.get(employee.id)?.get(day.date)!.availability_time_blocks
                const overrides = useScheduleStore.getState().scheduleGrid.get(employee.id)?.get(day.date)!.override_time_blocks
                //console.log(availability_time_block)
               return (
                    <Flex key={day.days_of_week} 
                        flex={1}
                        direction={'column'}
                        justify={'center'}  
                        bg={`${employee.color}`}  
                        bd={'1px solid black'} 
                    >
                        <>
                        {
                            overrides
                            ?  overrides.map((time_block)=>{
                                return(
                                    <Group flex={1} key={`override-group-${day.days_of_week}`} bg={'yellow'} justify="center">
                                        <Text fz={14}>{convertTo12hr(time_block.start_time)}</Text>  
                                        <Text fz={14}>-</Text>
                                        <Text fz={14}>{convertTo12hr(time_block.end_time)}</Text>
                                    </Group>
                                )
                            })

                            : 
                            
                            availability_time_block?.map((time_block)=>{
                                
                               
                                return(
                                    <TimeRangePicker
                                    data={time_block}
                                    onChange={(time,slot)=>createAvailabilityOverride(time,slot,employee.id,day.date,time_block)}
                                    
                                    />
                                )
                                
                            })
                        
                           
                            
                            

                            




                        }
                        </>



                            

                    </Flex>

               )
               

            })}
            
        </Flex>}

    </>)
}

export default EmployeeAvailabilityRow