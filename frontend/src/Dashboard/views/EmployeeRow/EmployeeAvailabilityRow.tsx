import { Flex, Group, Text } from "@mantine/core"
import type { Day } from "../../Interfaces/Day"
import type { TimeBlock } from "../../Interfaces/TimeBlock"
import { DateTime } from "luxon"
import type { OvTimeBlock } from "../../Interfaces/OvTimeBlock"
import type { Employee } from "../../Interfaces/Employee"


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
               
               return (
                    <Flex key={day.days_of_week} direction={'column'}
                        bg={`${employee.color}`}  justify={'center'}  bd={'1px solid black'} flex={1}>
                        <>
                            {
                                ov_time_blocks_date.get(day.date) ===undefined 
                                ? null 
                                :  ov_time_blocks_date.get(day.date)?.map((block)=>{
                                    return(
                                        <Group flex={1} key={`override-group-${day.days_of_week}`} bg={'yellow'} justify="center">
                                                <Text fz={14}>{convertTo12hr(block.start_time)}</Text>  
                                                <Text fz={14}>-</Text>
                                                <Text fz={14}>{convertTo12hr(block.end_time)}</Text>
                                            </Group>
                                    )
                                })
                            }



                            {
                                
                                
                                
                                time_blocks_DOW.get(day.days_of_week) === undefined && ov_time_blocks_date.get(day.date) ===undefined
                                ? (<Text >unavailable</Text>)
                                : (time_blocks_DOW.get(day.days_of_week)?.map((block)=>{
                                    return(
                                        
                                            <Group key={`group-${day.days_of_week}`} justify="center">
                                                <Text fz={14}>{convertTo12hr(block.start_time)}</Text>  
                                                <Text fz={14}>-</Text>
                                                <Text fz={14}>{convertTo12hr(block.end_time)}</Text>
                                            </Group>
                                            
                                        
                                    )
                                }))
                                
                            }
                        </>
                    </Flex>

               )
               

            })}
            
        </Flex>}

    </>)
}

export default EmployeeAvailabilityRow