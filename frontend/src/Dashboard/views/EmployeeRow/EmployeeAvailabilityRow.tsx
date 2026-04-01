import { Flex, Group, Text } from "@mantine/core"
import type { Day } from "../../Interfaces/Day"
import type { TimeBlock } from "../../Interfaces/TimeBlock"
import { DateTime } from "luxon"
import type { OvTimeBlock } from "../../Interfaces/OvTimeBlock"
import type { Employee } from "../../Interfaces/Employee"
import TimeRangePicker from "../../Slot/TimeRangePicker/TimeRangePicker"



interface availabilityProp{
    employee:Employee
    hidden: boolean
    dateRange: Day[]
    time_blocks_DOW: Map<number,TimeBlock[]>
    ov_time_blocks_date: Map<string,OvTimeBlock[]>
}
const convertTo12hr = (time:string | null)=>{
    
    if(!time) return ""
    const dt = DateTime.fromISO(time)
    return dt.toFormat('hh:mm a')
}

function EmployeeAvailabilityRow({employee,hidden,dateRange,time_blocks_DOW,ov_time_blocks_date}:availabilityProp){

    return(<>

        {!hidden && <Flex gap={5} >
            {dateRange.map((day)=>{

                const overrides = ov_time_blocks_date.get(day.date)
                const availabilities = time_blocks_DOW.get(day.days_of_week) ?? [null]
                console.log(availabilities)
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
                            
                            availabilities?.map((time_block)=>{
                                return(
                                    <TimeRangePicker
                                    data={time_block}
                                    onChange={async()=>{}}
                                    
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