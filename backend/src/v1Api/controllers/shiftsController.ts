import { Request,Response } from "express"
import prisma from "../../../db/db"
import {io} from '../../app'
import { DateTime } from "luxon";





export async function deleteShift(req:Request,res:Response){
    const shift_id = Number(req.params.id);
   
    if(Number.isNaN(shift_id)){
        return res.status(400).json({error:"Invalid shift id"})
    }

    try{
        const deletedShift = await prisma.employee_Shifts.delete({
            where:{id:shift_id},
            select:{id:true}
        })
        
        io.emit("shiftDeleted",{shift_id:deletedShift.id})

    }catch(error:unknown){
        if(error instanceof Error){
            console.error('Error',error.message)
            return res.status(500).json({success:false,error:error.message})
        }
    }
}
export async function moveShift(req:Request, res:Response){
    const shift_id = Number(req.params.id);
    const employee_id = Number(req.body.employee_id)
    const date = new Date(req.body.date);


    if(Number.isNaN(shift_id)){
        return res.status(400).json({error:"Invalid shift id"})
    }

    if(Number.isNaN(employee_id)){
        return res.status(400).json({error:"Invalid employee id"})
    }
    if(!(date instanceof Date) || isNaN(date.getTime())){
        return res.status(400).json({error:"Invalid date id"})
    }

    try{
       
        const updatedShift = await prisma.employee_Shifts.update({
            where:{
                id:shift_id
            },
            data:{
                employee_id:employee_id,
                date: date
            }
        })

        io.emit('shiftMoved',{ updatedShift })
        res.status(200).json({ updatedShift });


    }catch(error:any){
        console.error("Error updating shift:", error);

        if (error.code === "P2025"){
            return res.status(404).json({ error: "Shift not found" }); 
        } 
        return res.status(500).json({ error: "Failed to update shift" });
    }


}

export async function copyOverLastWeek(req:Request,res:Response){
    const {lastWeekArray} = req.body

    if(!Array.isArray(lastWeekArray)){
        return res.status(400).json({error:"Invalid lastWeekArray"})
    }

    const validatedArray:Date[] = lastWeekArray.filter((date)=>!DateTime.fromISO(date).isValid);

    if(validatedArray.length > 0){
        return res.status(400).json({error:"lastWeekArray contains invalid dates"})
    }


    const thisWeekArray= lastWeekArray.map((date:string)=>{
        return(
            DateTime.fromISO(date).plus({week:1}).toJSDate()
        )
    })
    console.log(thisWeekArray)
    try{
         await prisma.$transaction(async(tx)=>{

        // grabs all shifts from last week using last weeks dates sun-sat
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
    
        //takes all the shifts found last week and updates their dates to match current week
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

        io.emit('copyOverLastWeekshift',data)
        return res.json({success:true,shifts:newShifts})
    })
    }catch(error:any){
        return res.status(500).json({ error: "Failed to copy shifts for this week." });
    }
   
}