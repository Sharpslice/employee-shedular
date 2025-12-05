import { Flex, TextInput } from "@mantine/core"
import type { Override } from "../../Interfaces/Override"

function OverrideCell({override}:{override:Override}){
    return(
        <Flex tabIndex={0} className="overrideSlot" p={'5px'} align={"center"} flex={1} bg={'red'}
            
        
        
        >
            
            <TextInput
          
                styles={{
    input: {
      backgroundColor: 'transparent',
    //   border: '1px solid gray', // optional: keep border visible
      color: 'black',           // optional: text color
      textAlign:'center'
      
    },
  }}
            
            />
        </Flex>
    
    
    
    )
}


export default OverrideCell