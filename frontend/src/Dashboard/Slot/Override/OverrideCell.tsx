import { Flex, TextInput } from "@mantine/core"
import axios from "axios"
import { useState } from "react"
import type { Override } from "../../Interfaces/Override"
interface overrideProp{
    override:Override
}
function OverrideCell({override}:overrideProp){

    const [textValue, setTextValue] = useState<string>(override.type)
    const [editable, setEditable] = useState(false)

    const deleteOverride= async()=>{
        await axios.delete(`http://localhost:3000/api/v1/overrides/${override.id}`,{withCredentials:true})
    }



    return(
        <Flex flex={1}  justify={'center'}>
            <TextInput  unstyled
                styles={{
                    input: 
                    {
                        textAlign: 'center', // center text horizontally
                        padding: '0.5rem',   // optional
                    },
                }}
                readOnly={!editable}
                value={textValue}
                onChange={(e)=>{setTextValue(e.currentTarget.value)}}
                onDoubleClick={()=>{
                    console.log('doubleClick')
                    setEditable(!editable)
                }}
                onBlur={()=>{
                    setEditable(false)
                }}
                onKeyDown={(e)=>{
                    if(e.key ==='Backspace' || e.key ==='Delete'){
                        console.log('Delete')
                        deleteOverride()
                    }
                }}
            
            />
               
        
        </Flex>
    )
}

export default OverrideCell


