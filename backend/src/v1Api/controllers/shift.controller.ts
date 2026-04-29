import { Request,Response } from "express"

import {io} from '../../app'
import { DateTime } from "luxon";
import { copyOverLastWeekService, deleteShiftService, moveShiftService } from "../services/shift.services";

export async function deleteShift(req:Request,res:Response){
    const shift_id = Number(req.params.id);
   
   

    try{
        const {shift} = await deleteShiftService(shift_id)
        
        io.emit("shift:remove",shift)
        return res.json({ success: true, shift_id: shift.id});

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
     const date = DateTime.fromISO(req.body.date).toJSDate()!;
     const socket_id = req.body.socket_id;
    // const start_time = req.body.start_time;
    // const end_time = req.body.end_time;
    
    try{
          //console.log('calling moveShiftService with:', { shift_id, employee_id, date })
       
        const {draggedShift,shift} = await moveShiftService(shift_id,employee_id,date)

        // io.emit('shift:remove', {
        //     shift_id:draggedShift?.id,
        //     employee_id:draggedShift?.employee_id,
        //     date: draggedShift?.date
        // } 
        // )

        // io.emit('shift:add',{
        //     shift:shift,
        //     employee_id:shift.employee_id,
        //     date:shift.date
        // })
        
        io.emit('shift:moved', {
            remove: { employee_id: draggedShift?.employee_id, date: draggedShift?.date, shift_id: draggedShift?.id },
            add: { employee_id: shift?.employee_id, date: shift.date, shift: shift },
            socket_id:socket_id
        })




       return res.status(200).json({ success: true })

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