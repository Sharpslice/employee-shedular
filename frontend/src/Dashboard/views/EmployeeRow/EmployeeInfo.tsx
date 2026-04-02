import { Avatar, Flex, Text } from "@mantine/core"
import type { Employee } from "../../Interfaces/Employee"

interface InfoProp{
    employee:Employee
    totalHours: number
    onAvailabilityclick: ()=>void
}
function EmployeeInfo({onAvailabilityclick,employee,totalHours}:InfoProp){
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