import {Request,Response} from 'express';
import { createAvailabilityOverrideService, deleteOverrideService } from '../services/override.services';
import { io } from '../../app';

export async function deleteOverride(req:Request,res:Response){
    const override_id = Number(req.params.override_id);


    try{
        const deletedRow = await deleteOverrideService(override_id)
        io.emit('overrideDeleted',deletedRow)
        res.status(200).json({success:true})
    }catch(error:unknown){

    }
}



