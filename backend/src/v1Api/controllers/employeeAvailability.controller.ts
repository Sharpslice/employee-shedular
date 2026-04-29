import { Request,Response } from "express";
import { io } from "../../app";
import { deleteWeeklyAvailabilityExceptionService } from "../services/employeeAvailability.services";


export async function deleteWeeklyAvailabilityException(req:Request,res:Response){
    const exception_id = Number(req.params.exception_id)

    try{
        console.log('hey')
        const exception = await deleteWeeklyAvailabilityExceptionService(exception_id)
        io.emit('weeklyException:remove',exception)
        res.status(200).json({success:true})

    }catch(error:any){

    }
}