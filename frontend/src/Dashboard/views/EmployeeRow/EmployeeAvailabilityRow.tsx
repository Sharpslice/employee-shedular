import { Flex } from "@mantine/core"
import type { Day } from "../../Interfaces/Day"
import type { Availability } from "../../Interfaces/Availability"

interface availabilityProp{
    hidden: boolean
    dateRange: Day[]
    availability: Map<number,Availability>
}

function EmployeeAvailabilityRow({hidden,dateRange,availability}:availabilityProp){
    
    return(<>

        {!hidden && <Flex gap={5} >
            {dateRange.map((day)=>{
                //const time =  availability.find((availability) =>availability.day_of_week === day.days_of_week)

                



               return <Flex key={day.days_of_week} bg={'green'} justify={'center'} bd={'1px solid black'} flex={1}>
                    {
                        // time?.time_block ?
                        // `${time.time_block?.start_time} - ${time.time_block?.end_time}` : "unavailable"
                        "unavailable"
                    }
                </Flex>

            })}
            
        </Flex>}

    </>)
}

export default EmployeeAvailabilityRow