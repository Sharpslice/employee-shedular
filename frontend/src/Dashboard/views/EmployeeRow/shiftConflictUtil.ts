import { DateTime } from "luxon";
import type { Shift } from "../../Interfaces/Shift";
import type { TimeBlock } from "../../Interfaces/TimeBlock";
import type { OvTimeBlock } from "../../Interfaces/OvTimeBlock";

const normalizeTime = (dt: DateTime) => dt.set({ year: 1970, month: 1, day: 1 });


export const isShiftConflicting = (shift: Shift, time_blocks: TimeBlock[] | undefined, ov_time_blocks:OvTimeBlock[] | undefined)=> {
    const start_dt = normalizeTime(DateTime.fromISO(shift.start_time));
    const end_dt = normalizeTime(DateTime.fromISO(shift.end_time));

    
  

    if(ov_time_blocks){

        const allowedOvertime = ov_time_blocks.some(block =>{
            const override_start = DateTime.fromISO(block.start_time);
            const override_end = DateTime.fromISO(block.end_time);
            
            const startsAfterOrEqual = start_dt >= override_start;
            const endsBeforeOrEqual = end_dt <= override_end;
            console.log(startsAfterOrEqual)
            console.log(endsBeforeOrEqual)
            console.log((startsAfterOrEqual && endsBeforeOrEqual))
            return (startsAfterOrEqual && endsBeforeOrEqual)
        })
        return !allowedOvertime
    }




    if(time_blocks === undefined){
        return true
    }

    
    const fitsInAtLeastOneBlock = time_blocks.some(block => {
        const available_start = DateTime.fromISO(block.start_time);
        const available_end = DateTime.fromISO(block.end_time);

        const startsAfterOrEqual = start_dt >= available_start;
        const endsBeforeOrEqual = end_dt <= available_end;

        return startsAfterOrEqual && endsBeforeOrEqual;
    });

    return !fitsInAtLeastOneBlock;
}