import { Flex,Text, TextInput } from "@mantine/core"
import { useState } from "react"
interface overrideProp{
    override_type: string
}
function OverrideCell({override_type}:overrideProp){

    const [textValue, setTextValue] = useState(override_type)

    return(
        <Flex justify={'center'}>
            <TextInput  unstyled
                styles={{
                    input: 
                    {
                        textAlign: 'center', // center text horizontally
                        padding: '0.5rem',   // optional
                    },
                }}
            
                value={textValue}
                onChange={(e)=>{setTextValue(e.currentTarget.value)}}
            
            />
               
        
        </Flex>
    )
}

export default OverrideCell


