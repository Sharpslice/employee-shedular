import { Request,Response,NextFunction } from "express"

export function validateDeleteShift(req: Request, res: Response, next: NextFunction){
    const shift_id = Number(req.params.id);
   
    if(Number.isNaN(shift_id)){
        return res.status(400).json({error:"Invalid shift id"})
    }

    next()
}