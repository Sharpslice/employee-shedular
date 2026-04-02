import { Flex } from "@mantine/core";



function SlotPlaceholder(){
    
    return(<>
    <Flex 
        tabIndex={0} 
        flex={1} 
        bg={'grey'} 
        align={'center'} 
        justify={"center"} 
        onFocus={()=>{console.log('selecting cell')}}
        
    >
        slot
    </Flex>
    
    </>)
}
export default SlotPlaceholder

