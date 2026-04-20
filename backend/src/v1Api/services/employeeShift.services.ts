import { DateTime, Zone } from "luxon";
import prisma from "../../../db/db";
import { getShiftStatus } from "../controllers/getShiftStatus";

export async function createShiftService(employee_id:number,date:string,start_time?:string,end_time?:string){
   return prisma.$transaction(async (tx) => {
        const shift = await tx.employee_Shifts.create({
            data: {
                employee_id: employee_id,
                date: date,
                start_time: start_time ?? null,
                end_time: end_time ?? null
            }
        })
        const status = await getShiftStatus(shift.id, tx)
     
        return { ...shift, status }
    })

}

export async function updateShiftTimeservice(shift_id:number,date:string,start_time?:string | null,end_time?:string | null){

    return prisma.$transaction(async (tx) => {
        const shift = await tx.employee_Shifts.findUnique({
            where: {
                id: shift_id
            }
        })
        if (!shift) {
            throw new Error('shift not found')
        }

        const startDt = start_time
            ? DateTime.fromISO(`1970-01-01T${start_time}`, { zone: 'America/Los_Angeles' })
            : shift.start_time
                ? DateTime.fromJSDate(shift.start_time)
                : null

        const endDt = end_time
            ? DateTime.fromISO(`1970-01-01T${end_time}`, { zone: 'America/Los_Angeles' })
            : shift.end_time
                ? DateTime.fromJSDate(shift.end_time)
                : null

        if ((startDt && endDt) && startDt >= endDt) {
            throw new Error(`start time: ${startDt} cannot be greater or equal to end time: ${endDt}`)
        }

        const start = startDt ? startDt.toUTC().toISO() : null
        const end = endDt ? endDt.toUTC().toISO() : null

        const updatedShift = await tx.employee_Shifts.update({
            where: {
                id: shift_id
            },
            data: start_time
                ? { start_time: start }
                : { end_time: end }
        })


        const status = await getShiftStatus(updatedShift.id,tx)
        return {...updatedShift,status}
    })
    
}