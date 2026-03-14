import { DateTime } from "luxon";
import type { Shift } from "../../Interfaces/Shift";
import type { TimeBlock } from "../../Interfaces/TimeBlock";
import type { OvTimeBlock } from "../../Interfaces/OvTimeBlock";
import type { Override } from "../../Interfaces/Override";

const normalizeTime = (dt: DateTime) => dt.set({ year: 1970, month: 1, day: 1 });

const withinTimeBlocks = (start_dt:DateTime,end_dt:DateTime, time_blocks: TimeBlock[] | OvTimeBlock[]) =>{
    const within = time_blocks.some(block =>{
            const override_start = DateTime.fromISO(block.start_time);
            const override_end = DateTime.fromISO(block.end_time);
            
            const startsAfterOrEqual = start_dt >= override_start;
            const endsBeforeOrEqual = end_dt <= override_end;
            
            return (startsAfterOrEqual && endsBeforeOrEqual)
    })
    return within
}



export const getShiftStatus = (shift: Shift, time_blocks: TimeBlock[] | undefined, ov_time_blocks:OvTimeBlock[] | undefined,overrides:Override[] | undefined)=> {
    const start_dt = normalizeTime(DateTime.fromISO(shift.start_time));
    const end_dt = normalizeTime(DateTime.fromISO(shift.end_time));

    if(overrides){
        if(overrides.some((override)=> override.type !=='AVAILABLE')){
            
            return 'conflict'
        }
    }
    
    if(ov_time_blocks){
        if(withinTimeBlocks(start_dt,end_dt,ov_time_blocks)){
            return 'override'
        }
    }

    if(time_blocks === undefined){
        return 'conflict'
    }

    if(withinTimeBlocks(start_dt,end_dt,time_blocks)){
        return 'allowed'
    }
    return 'conflict'



    
    
   
}