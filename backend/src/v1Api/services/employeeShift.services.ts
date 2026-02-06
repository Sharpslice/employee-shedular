import { DateTime, Zone } from "luxon";
import prisma from "../../../db/db";

export async function createShiftService(employee_id:number,date:string){
    return prisma.employee_Shifts.create({
           data:{
                employee_id:employee_id,
                date: date,
                start_time:null,
                end_time:null
           }
        })

}

export async function updateShiftTimeservice(shift_id:number,date:string,start_time?:string | null,end_time?:string | null){

    const shift = await prisma.employee_Shifts.findUnique({
        where:{
            id:shift_id
        }
    })
    if(!shift){
        throw new Error('shift not found')
    }
    
    const startDt  = start_time 
                        ? DateTime.fromISO(`${date}T${start_time}`,{zone:'America/Los_Angeles'}) 
                        : shift.start_time 
                            ? DateTime.fromJSDate(shift.start_time, )
                            : null


    const endDt = end_time 
                    ? DateTime.fromISO(`${date}T${end_time}`,{zone:'America/Los_Angeles'}) 
                    : shift.end_time
                        ? DateTime.fromJSDate(shift.end_time)
                        : null

    console.log(`start:${startDt}
                end:${endDt}`)
    if((startDt && endDt) && startDt >= endDt){
        throw new Error(`start time: ${startDt} cannot be greater or equal to end time: ${endDt}`)
    }

    const start = startDt ? startDt.toUTC().toISO() : null
    const end = endDt ? endDt.toUTC().toISO() : null
    return await prisma.employee_Shifts.update({
            where:{
                id:shift_id
            },
            data:
                start_time 
                ? {start_time: start,   
                }
                : {end_time: end} 
        })
}