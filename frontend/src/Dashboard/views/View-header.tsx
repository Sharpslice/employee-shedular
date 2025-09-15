import {  Flex } from "@mantine/core";


interface ViewHeaderProps{
    children: React.ReactNode
}
function ViewHeader({children}:ViewHeaderProps){
    return(<>
        <Flex  gap={'1rem'}>
            <Flex justify={'center'} align={'center'} bd={'1px solid black'} w={'5rem'}>Staff</Flex>
            <Flex gap={5} flex={1}>
                {children}
            </Flex>
                
            
        </Flex>

    </>)
}


export default ViewHeader;