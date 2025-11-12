import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Day } from "../../Interfaces/Day";
import type { Employee } from "../../Interfaces/Employee";



function useGridNavigation(){
    const { dateRange,employeeList } = useOutletContext<{ dateRange: Day[],employeeList:Employee[] }>();

    const [focusedId,setFocusedId] = useState({row:100,col:100})

    const cellRefs = useMemo(() => {
            return Array.from({ length: employeeList.length }, () =>
                Array.from({ length: dateRange.length }, () => React.createRef<HTMLDivElement>())
            );
        }, [employeeList.length, dateRange.length]);

    console.log(cellRefs)
    const handleArrowKey=(key:string,row:number,col:number)=>{
        switch(key){
            case('ArrowUp'):
                cellRefs[row-1][col].current?.focus()
                break;
            case('ArrowDown'):
                cellRefs[row+1][col].current?.focus()
                break;
            case('ArrowLeft'):
                cellRefs[row][col-1].current?.focus()   
                break;
            case('ArrowRight'):
                cellRefs[row][col+1].current?.focus()
                break;
        }
    }

    return {cellRefs, focusedId,setFocusedId,handleArrowKey}
}

export default useGridNavigation