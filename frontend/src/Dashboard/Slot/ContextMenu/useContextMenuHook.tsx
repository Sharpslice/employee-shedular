import { useState } from "react"
import type { Day } from "../../Interfaces/Day"
import type { Employee } from "../../Interfaces/Employee"


function useContextMenuHook(){

    const [coords,setCoords] = useState({x:0,y:0})
    const [selectedCell, setSelectedCell] = useState<{employee:Employee | null, date:Day | null}>({employee:null,date:null})
    const [isActive,setActive] = useState<boolean>(false)

    return {coords,setCoords,isActive,setActive,selectedCell, setSelectedCell}
}

export default useContextMenuHook