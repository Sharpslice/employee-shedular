import {  Flex } from "@mantine/core";



interface ViewHeaderProps{
    colGap?: number
    children: React.ReactNode
}
function ViewHeader({colGap,children}:ViewHeaderProps){
    return(<>
        <Flex  gap={'1rem'}>
            <Flex justify={'center'} align={'center'} bd={'1px solid black'} w={'15rem'}>Employees</Flex>
            <Flex gap={colGap }flex={1}>
                {children}
            </Flex>
                
            
        </Flex>

    </>)
}


export default ViewHeader;