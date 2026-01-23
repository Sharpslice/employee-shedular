import { Request,Response } from "express"
import prisma from "../db/db"
import {io} from '../src/app'


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