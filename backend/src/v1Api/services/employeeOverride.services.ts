import {Request,Response} from 'express'
import prisma from '../../../db/db'
import { DateTime } from 'luxon';
import { Prisma } from '../../generated/prisma';

export async function createLeaveService(employee_id:number,date:string){

    const override = await prisma.employee_Time_Override.create({
        data:{
            employee_id:employee_id,
            date:date,
            type:"MISC",
            status:'APPROVED'
        }
    })


    return override


}

async function copyOverAvailabilityException (
    tx:Prisma.TransactionClient,employee_id:number,
    date:string,start_time?:string,end_time?:string
){
    console.log('helllod avid')
    const availability = await tx.employee_Weekly_Availability.create({
        data:{
            employee_id:employee_id,
            date:DateTime.fromISO(date).toUTC().toJSDate(),
            is_available:true
        }
    })

    const time_block = await tx.employee_Weekly_Availability_Time_Block.create({
        data:{
            employee_weekly_availability_id:availability.id,
            start_time:start_time ?? null,
            end_time:end_time ?? null

        }
    })
    console.log('creating')
    return availability

}
async function updateAvailabilityException(
    tx: Prisma.TransactionClient,
    employee_id: number,
    date: string,
    start_time?: string,
    end_time?: string
) {
    // find the exception record and its time blocks
    const exception = await tx.employee_Weekly_Availability.findUnique({
        where: {
            employee_id_date: {
                employee_id,
                date: DateTime.fromISO(date).toJSDate()
            }
        },
        include: { time_blocks: true }
    })

    if (!exception || !exception.time_blocks.length) return

    // update first time block for now — multiple blocks handled later
    await tx.employee_Weekly_Availability_Time_Block.update({
        where: { id: exception.time_blocks[0]!.id },
        data: {
            ...(start_time && { start_time: start_time}),
            ...(end_time && { end_time: end_time })
        }
    })

    const exceptionUpdated = await tx.employee_Weekly_Availability.findUnique({
        where: {
            employee_id_date: {
                employee_id,
                date: DateTime.fromISO(date).toJSDate()
            }
        },
        include: { time_blocks: true }
    })

    return exceptionUpdated
}

export async function createAvailabilityService(
    employee_id:number,date:string,
    time_block?:any,
    start_time?:string,end_time?:string,
    
 
    

){
    const exception = await prisma.$transaction(async (tx) => {
            console.log('poop')
            const existing = await tx.employee_Weekly_Availability.findUnique({
                where:{
                    employee_id_date:{
                        employee_id:employee_id,
                        date:DateTime.fromISO(date).toUTC().toJSDate()
                    }
                }
            })
            if(!existing){
                console.log('doesnt exist')
                await copyOverAvailabilityException(tx,employee_id,date,time_block?.start_time,time_block?.end_time)
            }
            return await updateAvailabilityException(tx,employee_id,date,start_time,end_time)
    });
    
    return exception
}