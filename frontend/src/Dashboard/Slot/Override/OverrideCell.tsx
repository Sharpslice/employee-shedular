import { ActionIcon, Flex, TextInput } from "@mantine/core"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import type { Override } from "../../Interfaces/Override"
import { IconCheck, IconX } from "@tabler/icons-react"
import { GridNavigationContext } from "../../views/GridNavigation/GridNavigationContext"
type Override_status = 'APPROVED' | 'PENDING' | 'DENIED'
interface overrideProp{
    override:Override
    status : Override_status
}
function OverrideCell({override,status}:overrideProp){

    const [textValue, setTextValue] = useState<string>(override.type)
    const [editable, setEditable] = useState(false)
    const {setMenuOpened} = useContext(GridNavigationContext)!;
    const deleteOverride= async()=>{
        await axios.delete(`http://localhost:3000/api/v1/overrides/${override.id}`,{withCredentials:true})
    }

    const updateOverrideStatus = async (status: Override_status) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/overrides/${override.id}/status`,{ status },{ withCredentials: true });

            if(response.data.success){
                console.log('success')
            }
            else{
                console.log('failed')
            }
        } catch (error) {
            console.error("Failed to update override status:", error);
        }
    };

   

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

    useEffect(() => {
        if (editable) {
            console.log('true')
            setMenuOpened(true)
        }
        }, [editable])
    
    return(
        <Flex h={'100%'} bg={'pink'} align={'center'} 
        
        
        >

            <TextInput  h={'100%'} radius={0}
                styles={{
                    root:{width:'100%'},
                    wrapper:{height:'100%'},
                    input: { backgroundColor: getStatusColor(status),textAlign: 'center', height:'100%'  },
                }}
                
                
                readOnly={!editable}
                value={textValue}

                onChange={(e)=>{setTextValue(e.currentTarget.value)}}
                onDoubleClick={()=>{
                    setEditable(true)
                }}
                onBlur={()=>{
                    setEditable(false)
                }}
                onKeyDown={(e)=>{
                    if(!editable &&(e.key ==='Backspace' || e.key ==='Delete')){
                        console.log('Delete')
                        deleteOverride()
                    }
                    if(e.key ==='Enter' && editable){
                        console.log('set to false')
                        setMenuOpened(false)
                    }
                    if(e.key ==='Enter'){
                        setEditable(true)
                    }
                }}
                
            />

            {status === 'PENDING' && 
            <Flex direction={'column'}>
                <ActionIcon radius={0} bg='green' w={'100%'} onClick={()=>{updateOverrideStatus('APPROVED')}}>
                    <IconCheck/>
                </ActionIcon>
                
                <ActionIcon radius={0} bg='green' w={'100%'} onClick={()=>updateOverrideStatus('DENIED')}>
                    <IconX/>
                </ActionIcon>
                

            </Flex>}
            

                 </Flex>
        
       
    )
}

export default OverrideCell


