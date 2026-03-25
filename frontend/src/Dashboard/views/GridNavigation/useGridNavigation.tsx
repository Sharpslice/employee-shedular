import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Day } from "../../Interfaces/Day";
import type { Employee } from "../../Interfaces/Employee";
import type { Shift } from "../../Interfaces/Shift";



function useGridNavigation(){
    const { dateRange,employeeList } = useOutletContext<{ dateRange: Day[],employeeList:Map<number,Employee> }>();

    const [focusedId,setFocusedId] = useState({row:100,col:100})

    const [menuOpened,setMenuOpened] = useState(false)

    const [timeOpened,setTimeOpened] = useState(false)

    const [clipboard,setClipboard] = useState<Shift>()

    const focusedRef = React.useRef({ row: 0, col: 0 });

    const cellRefs = useMemo(() => {
            return Array.from({ length: employeeList.size }, () =>
                Array.from({ length: dateRange.length }, () => React.createRef<HTMLDivElement>())
            );
        }, [employeeList.size, dateRange.length]);


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