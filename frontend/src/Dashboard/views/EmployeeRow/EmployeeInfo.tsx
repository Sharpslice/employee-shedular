import { Avatar, Flex, Text } from "@mantine/core"
import type { Employee } from "../../Interfaces/Employee"
import { DateTime } from "luxon"
import { useMemo } from "react"

interface InfoProp{
    employee:Employee
    onAvailabilityclick: ()=>void
}
function EmployeeInfo({onAvailabilityclick,employee}:InfoProp){

    const calculateTime = (start:string,end:string)=>{
            const startDt = DateTime.fromISO(start)
            const endDt = DateTime.fromISO(end)
            if(!startDt.isValid || !endDt.isValid){
                return 0;
            }

            const diff = endDt.diff(startDt,['hours']);
            
            return Number(diff.as('hours').toFixed(2)) 
        }   

    const totalHours = useMemo(()=>{
      return 0//shifts.reduce((total,shift)=> total + calculateTime(shift.start_time,shift.end_time) ,0)
    },[])
    
    return(
        <Flex 
            gap={15} align={'center'} 
            bd={'1px solid black'} w={'15rem'} p={5} 
            onClick={onAvailabilityclick}
            bg={`${employee.color}`}
        >
            <Avatar name={employee.name} radius={'xs'} color={'white'}></Avatar>
            <Flex direction={'column'}>
                <Text size="lg">{employee.name}</Text>
                <Text>{`Total hours: ${totalHours}`}</Text>

            </Flex>
        </Flex>
    )
}

export default EmployeeInfo

{/* <Text size='sm'>{employee.position.toLowerCase().replace(/^\w/,c=>c.toUpperCase())}</Text> */}