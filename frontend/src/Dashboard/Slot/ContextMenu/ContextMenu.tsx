import { Button, Flex} from "@mantine/core"
import { useContext } from "react"
import { ContextMenuContext } from "./ContextMenuProvider"

import axios from "axios"

function ContextMenu(){
    const {selectedCell,coords,isActive} = useContext(ContextMenuContext)!

    const createShift =async()=>{
        await axios.post(`http://localhost:3000/api/v1/employees/${selectedCell.employee?.id}/shifts/`,{date:selectedCell.date?.date})
        console.log(selectedCell.employee?.id)
    }
    const createOverride = async()=>{
        try{
           const response=  await axios.post(`http://localhost:3000/api/v1/overrides/${selectedCell.employee?.id}/${selectedCell.date?.date}`,
            {isAvailable:false}
        )
            if(response.data.success){
                console.log('created override',response.data.row)
                
            }
        }catch(err){
            console.error(err)
        }
        
        
    }

    return(
        <>
            
                {isActive && 
                    <Flex 
                        style={{position:'absolute', top:coords.y,left:coords.x,zIndex:1}}
                        w={'125x'}  bg={'green'}

                        direction={'column'}
                >
                  <Button onClick={createShift}>Shift</Button>
                  <Button >Availability</Button>
                  <Button onClick={createOverride}>Override</Button>
                
                </Flex>}
            
        </>
       
    )
}

export default ContextMenu