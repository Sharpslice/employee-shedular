import { Flex } from "@mantine/core"
import type { Day } from "../../Interfaces/Day"

interface availabilityProp{
    hidden: boolean
    dateRange: Day[]
}

function EmployeeAvailabilityRow({hidden,dateRange}:availabilityProp){
    return(<>

        {!hidden && <Flex gap={5} >
            {dateRange.map((day)=>(
                <Flex key={day.days_of_week} bg={'green'} justify={'center'} bd={'1px solid black'} flex={1}>
                    Available 9:00am - 1:00pm
                </Flex>

            ))}
            
        </Flex>}

    </>)
}

export default EmployeeAvailabilityRow