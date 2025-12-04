import { Flex } from "@mantine/core"
import type { Override } from "../../Interfaces/Override"

function OverrideCell({override}:{override:Override}){
    return(
        <Flex>
            {override.id}
        </Flex>
    
    
    
    )
}


export default OverrideCell