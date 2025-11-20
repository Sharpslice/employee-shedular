import { useState } from "react"


function useContextMenuHook(){

    const [coords,setCoords] = useState({x:0,y:0})
    const [isActive,setActive] = useState<boolean>(false)

    return {coords,setCoords,isActive,setActive}
}

export default useContextMenuHook