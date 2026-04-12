import React, { useMemo, useState } from "react";

import type { Shift } from "../../Interfaces/Shift";
import { useScheduleStore } from "../../../scheduleStore";



function useGridNavigation(){
    const employees = useScheduleStore(state=>state.employees)
    const dateRange = useScheduleStore(state=>state.dateRange)

    const [focusedId,setFocusedId] = useState({row:100,col:100})

    const [menuOpened,setMenuOpened] = useState(false)

    const [timeOpened,setTimeOpened] = useState(false)

    const [clipboard,setClipboard] = useState<Shift>()

    const focusedRef = React.useRef({ row: 0, col: 0 });

    const cellRefs = useMemo(() => {
            return Array.from({ length: employees.length }, () =>
                Array.from({ length: dateRange.length }, () => React.createRef<HTMLDivElement>())
            );
        }, [employees, dateRange]);


    const handleArrowKey=(key:string,row:number,col:number)=>{
        console.log('arrow key triger')
        if(menuOpened) return
        switch(key){
            case('ArrowUp'):
                if(menuOpened || timeOpened) return
                cellRefs[row-1][col].current?.focus()
                break;
            case('ArrowDown'):
                if(menuOpened || timeOpened) return
                cellRefs[row+1][col].current?.focus()
                break;
            case('ArrowLeft'):
                if(timeOpened) return
                cellRefs[row][col-1].current?.focus()   
                break;
            case('ArrowRight'):
                if(timeOpened) return
                cellRefs[row][col+1].current?.focus()
                break;
            case('Tab'):
                if(!menuOpened) return

                setMenuOpened(false)
        }
    }

    return {cellRefs, 
            focusedId,setFocusedId,
            handleArrowKey,
            setMenuOpened,menuOpened,
            setTimeOpened,timeOpened,
            setClipboard,clipboard,
            focusedRef
            
        
        }
}

export default useGridNavigation