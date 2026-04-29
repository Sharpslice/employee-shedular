// import {Request,Response} from 'express';
// import { deleteOverrideService, updateOverrideStatusService} from '../services/override.services';
// import { io } from '../../app';

// export async function deleteOverride(req:Request,res:Response){
//     const override_id = Number(req.params.override_id);


//     try{
//         const deletedRow = await deleteOverrideService(override_id)
//         io.emit('overrideDeleted',deletedRow)
//         res.status(200).json({success:true})
//     }catch(error:unknown){

//     }



// }

// export async function updateOverrideStatus(req:Request,res:Response){
//     console.log('hey')
//     const override_id = Number(req.params.override_id);
//     const status  = req.body.status
//     try{
//         const override = await updateOverrideStatusService(override_id,status);
//         io.emit('overrideStatusUpdated',override)
//         res.status(200).json({success:true,override})
//     }catch(error:unknown){
//         res.status(500).json({
//             success: false,
//             message: 'Failed to update override status',
           
//         });
//     }
// }


