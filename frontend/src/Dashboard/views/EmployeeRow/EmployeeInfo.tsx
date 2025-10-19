import { Avatar, Flex, Text } from "@mantine/core"
import type { Employee } from "../../Interfaces/Employee"

interface InfoProp{
    employee:Employee
    onAvailabilityclick: ()=>void
}
function EmployeeInfo({onAvailabilityclick,employee}:InfoProp){
    return(
        <Flex onClick={onAvailabilityclick} gap={10} align={'center'} bd={'1px solid black'} w={'10rem'} p={5} >
                    <Avatar name={employee.name} radius={'xs'} color={"blue"}></Avatar>
                    <Flex direction={'column'}>
                        <Text size="lg">{employee.name}</Text>
                        <Text size='sm'>{employee.position.toLowerCase().replace(/^\w/,c=>c.toUpperCase())}</Text>
                    </Flex>
                </Flex>
    )
}

export default EmployeeInfo