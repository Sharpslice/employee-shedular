import { Request,Response } from "express"

import {io} from '../../app'
import { DateTime } from "luxon";
import { copyOverLastWeekService, deleteShiftService, moveShiftService } from "../services/shift.services";

export async function deleteShift(req:Request,res:Response){
    const shift_id = Number(req.params.id);
   
   

    try{
        const deletedShift = await deleteShiftService(shift_id)
        
        io.emit("shiftDeleted",{shift_id:deletedShift.id})
        return res.json({ success: true, shift_id: deletedShift.id });

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

    try{
       
        const updatedShift = await moveShiftService(shift_id,employee_id,date)

        io.emit('shiftMoved', {updatedShift} )
        res.status(200).json( {updatedShift} );

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

    const thisWeekArray= lastWeekArray.map((date:string)=>{
        return(
            DateTime.fromISO(date).plus({week:1}).toJSDate()
        )
    })

    try{
        const response = await copyOverLastWeekService(lastWeekArray,thisWeekArray)

        io.emit('copyOverLastWeekshift',response.data)
        return res.json({success:true,shifts:response.newShifts})
    
    }catch(error:any){
        return res.status(500).json({ error: "Failed to copy shifts for this week." });
    }
   
}