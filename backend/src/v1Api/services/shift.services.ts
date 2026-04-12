import { DateTime } from "luxon";
import prisma from "../../../db/db";



export async function deleteShiftService(shift_id:number){
  
    const override = await prisma.employee_Time_Override.findFirst({
        where:{shift_id:shift_id},
        include:{
            time_blocks:true
        }
    })

    


    const shift = await prisma.employee_Shifts.delete({
        where:{id:shift_id},
        select:{id:true}
    })
    
    return {shift,override}
}

type Shift = {
    id: number,
    employee_id: number,
    date: Date,
    // start_time: string,
    // end_time: string
}
export async function moveShiftService(
    shift_id:number,
    employee_id:number,
    date:Date
) {
    return prisma.$transaction(async (tx) => {
        const draggedShift = await tx.employee_Shifts.findUnique({
            where:{
                id:shift_id
            }
        })
        
        const shift = await tx.employee_Shifts.update({
            where:{
                id:shift_id
            },
            data:{
                employee_id:employee_id,
                date: date
            }
        })
        return {draggedShift,shift}

    });
}

export async function copyOverLastWeekService(lastWeekArray:string[],thisWeekArray:Date[]){
    return prisma.$transaction(async(tx)=>{
        const prevShifts = await tx.employee_Shifts.findMany({
            select:{
                employee_id:true,
                date:true,
                start_time:true,
                end_time:true,
            },
            where:{
                date:{
                    in:lastWeekArray.map((date:string)=> new Date(date))
                }
                }
        });
        const newShifts = prevShifts.map((shift)=>{
            return(
                {
                    employee_id:shift.employee_id,
                    date: DateTime.fromJSDate(shift.date).plus({week:1}).toJSDate() ,
                    start_time:shift.start_time,
                    end_time:shift.end_time,

                }
            )
            
        })

        await tx.employee_Shifts.deleteMany({
            where:{
                date: {
                    in: thisWeekArray
                }
            }
        })
        await tx.employee_Shifts.createMany({

            data:newShifts,
       


        })
    
        const data = await tx.employee_Shifts.findMany({
            where:{
                date:{
                    in: thisWeekArray
                }
            }
        })


        return {data,newShifts}



    })
}