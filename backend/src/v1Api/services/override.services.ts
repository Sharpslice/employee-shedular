import {Request,Response} from 'express';
import prisma from "../../../db/db";
export async function createAvailabilityOverrideService(
    employee_id:number, date:string,isAvailable:boolean,
    start_time:string, end_time:string
){


    const response = await prisma.$transaction(async(tx)=>{
        const override = await tx.employee_Time_Override.create({
            data:{
                employee_id: employee_id,
                date:date,
                type:"MISC"
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