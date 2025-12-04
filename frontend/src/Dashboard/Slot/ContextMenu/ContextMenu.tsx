import { Flex } from "@mantine/core"
import { useContext } from "react"
import { ContextMenuContext } from "./ContextMenuProvider"

function ContextMenu(){
    const menu = useContext(ContextMenuContext)!
    return(
        <>
            
                {menu.isActive && <Flex style={{position:'absolute', top:menu.coords.y,left:menu.coords.x,zIndex:1}}
                
                    w={'100px'} h={'100px'} bg={'green'}
                >
                    
                hello
                </Flex>}
            
        </>
       
    )
}

export default ContextMenu