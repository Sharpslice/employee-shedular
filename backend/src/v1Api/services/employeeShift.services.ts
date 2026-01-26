import prisma from "../../../db/db";

export async function createShiftService(employee_id:number,date:Date){
    return prisma.employee_Shifts.create({
           data:{
                employee_id:employee_id,
                date: date,
                start_time:null,
                end_time:null
           }
        })

}

export async function updateShiftTimeservice(shift_id:number,start_time:string,end_time:string){
    return await prisma.employee_Shifts.update({
            where:{
                id:shift_id
            },
            data:
                start_time 
                ? {start_time}
                : {end_time} 
        })
}