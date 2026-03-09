import {Request,Response} from 'express';
import prisma from "../../../db/db";



export async function createAvailabilityOverrideService(
    employee_id:number, date:string,type:string,
    start_time:string, end_time:string, shift_id:number
){


    const response = await prisma.$transaction(async(tx)=>{
        const override = await tx.employee_Time_Override.create({
            data:{
                employee_id: employee_id,
                date:date,
                type:'AVAILABLE',
                shift_id:shift_id
            }
        })

        const time_block = await tx.employee_Override_Time_Block.create({
            data:{
                employee_time_override_id: override.id,
                start_time: start_time,
                end_time: end_time
            }
        })

        return {override,time_block}
    })
    
    return response;
}

export async function deleteOverrideService(override_id:number){
    const deletedRow = await prisma.employee_Time_Override.delete({
        where:{
            id:override_id
        },
        select:{
            id:true
        }
    })

    return deletedRow
}
