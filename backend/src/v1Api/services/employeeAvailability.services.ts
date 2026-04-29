 import prisma from "../../../db/db";

export async function deleteWeeklyAvailabilityExceptionService(exception_id:number){
    return prisma.$transaction(async (tx)=>{
        const exception = await tx.employee_Weekly_Availability_Time_Block.delete({
            where:{
                id:exception_id
            }
        })
        return exception
    })
}