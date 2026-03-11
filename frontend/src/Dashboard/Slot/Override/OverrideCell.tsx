import { ActionIcon, Flex, Group, TextInput } from "@mantine/core"
import axios from "axios"
import { useState } from "react"
import type { Override } from "../../Interfaces/Override"
import { IconCheck, IconX } from "@tabler/icons-react"
type Override_status = 'APPROVED' | 'PENDING' | 'DENIED'
interface overrideProp{
    override:Override
    status : Override_status
}
function OverrideCell({override,status}:overrideProp){

    const [textValue, setTextValue] = useState<string>(override.type)
    const [editable, setEditable] = useState(false)

    const deleteOverride= async()=>{
        await axios.delete(`http://localhost:3000/api/v1/overrides/${override.id}`,{withCredentials:true})
    }

    const getStatusColor = (status:Override_status) =>{
        switch(status){
            case('APPROVED'):
                return undefined
            case('PENDING'):
                return 'pink'
            case('DENIED'):
                return 'red'
            default:
                return undefined
        }

        
    }
    
    return(
        <Flex h={'100%'} bg={'pink'} align={'center'}>

            <TextInput  h={'100%'}
              
                radius={0}
                styles={{
                   root:{
                    width:'100%'
                   },
                    wrapper:{
                        height:'100%',
                        
                    },
                    input: { backgroundColor: getStatusColor(status),textAlign: 'center', height:'100%' },
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
                    if(!editable &&(e.key ==='Backspace' || e.key ==='Delete')){
                        console.log('Delete')
                        deleteOverride()
                    }
                }}
                
            />

            {/* <Group bg='blue' wrap="nowrap">
                <IconCheck/>
                <IconX/>

            </Group> */}
            

                 </Flex>
        
       
    )
}

export default OverrideCell


