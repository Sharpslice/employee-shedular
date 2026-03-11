import {Request,Response} from 'express';
import prisma from "../../../db/db";



type Override_Status = 'APPROVED' | 'PENDING' | 'DENIED'
export async function createAvailabilityOverrideService(
    employee_id:number, date:string,type:string,
    start_time:string, end_time:string, shift_id:number
){

    const response = await prisma.$transaction(async (tx) => {

        let time_block = null;
        let override = null;
        //checks to see override already exist for that [shift]
        override = await tx.employee_Time_Override.findFirst({
            where:{shift_id},
            include:{time_blocks:true}
        })

        console.log(override?.time_blocks[0]?.id)
        //if override exists AND its an override that has a time block
        if(override && override.time_blocks.length > 0){
            time_block = await tx.employee_Override_Time_Block.update({
                where:{id:override.time_blocks[0]!.id},
                data:{
                    start_time,
                    end_time
                }
            })
        }
        //override does not exist so create a neww override
        else{
            override = await tx.employee_Time_Override.create({
            data:{
                employee_id: employee_id,
                date:date,
                type:'AVAILABLE',
                shift_id:shift_id,
                status:'APPROVED'
                }
            })
            time_block = await tx.employee_Override_Time_Block.create({
                data:{
                    employee_time_override_id: override.id,
                    start_time: start_time,
                    end_time: end_time
                }
            })

        }
        return {override,time_block}
    });
    
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

export async function updateOverrideStatusService(override_id: number, status: Override_Status) {
    console.log('inside service')
    try {
        const override = await prisma.employee_Time_Override.update({
            where: { id: override_id },
            data: { status: status }
        });
        
        return override;
    } catch (error) {
        console.error('Error updating override:', error);
       
    }
}
