import { Button, Flex} from "@mantine/core"
import { useContext } from "react"
import { ContextMenuContext } from "./ContextMenuProvider"


import { createShift } from "../../../services/shiftServices"
import { createOverride } from "../../../services/overrideServices"

function ContextMenu(){
    const {selectedCell,coords,isActive} = useContext(ContextMenuContext)!

    

    return(
        <>
            
                {isActive && 
                    <Flex 
                        style={{position:'absolute', top:coords.y,left:coords.x,zIndex:1}}
                        w={'125x'}  bg={'green'}

                        direction={'column'}
                >
                  <Button onClick={()=>createShift(selectedCell.employee!.id,selectedCell.date!.date)}>Shift</Button>
                  <Button >Availability</Button>
                  <Button onClick={()=>createOverride(selectedCell.employee!.id,selectedCell.date!.date)}>Override</Button>
                
                </Flex>}
            
        </>
       
    )
}

export default ContextMenu