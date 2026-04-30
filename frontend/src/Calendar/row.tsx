import { Flex } from "@mantine/core"
import type { Employee } from "../Dashboard/Interfaces/Employee"
import { useScheduleStore } from "../scheduleStore"
import type { Shift } from "../Dashboard/Interfaces/Shift"
import { DateTime } from "luxon"


interface props{
    employee: Employee
    date:string
}
 const convertTo12hr = (time:string | null)=>{
        if(!time) return ""
        const dt = DateTime.fromISO(time);
        return dt.toFormat('hh:mm a')
    }
function Row({employee,date}:props){
    const scheduleGrid = useScheduleStore(state=>state.scheduleGrid)
    const shift = scheduleGrid.get(employee.id)?.get(date)?.shifts as Shift[]



    if(!shift) return 
    return(
        <>

            {
                shift.length > 0 ?
                <Flex flex={1} bg={`${employee.color}`}  style={{ 
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: 'clamp(12px, 1vw, 15px)'
                }}>
                    {employee.name} - {convertTo12hr(shift[0].start_time)} - {convertTo12hr(shift[0].end_time)}
                </Flex>
            : null
            
            }



        </>
    )
}

export default Row