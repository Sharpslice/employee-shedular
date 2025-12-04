import { Button, Flex} from "@mantine/core"
import { useContext } from "react"
import { ContextMenuContext } from "./ContextMenuProvider"

import axios from "axios"

function ContextMenu(){
    const {selectedCell,coords,isActive} = useContext(ContextMenuContext)!

    const createShift =async()=>{
        await axios.post(`http://localhost:3000/api/employee/shift/${selectedCell.employee?.id}/shift`,{date:selectedCell.date?.date})
        console.log('hey')
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
                  <Button>Availability</Button>
                  <Button>Override</Button>
                
                </Flex>}
            
        </>
       
    )
}

export default ContextMenu