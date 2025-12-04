import express from 'express';
import prisma from '../../db/db'
const override = express.Router()

override.post('/:id/:date',(req,res)=>{
    const employee_id = parseInt(req.params.id);
    const date = new Date(req.params.date)
    const {isAvailable,start_time,end_time,note} = req.body
    try{
        const row = prisma.availability_Override.upsert({
        where:{
            employee_id_date:{ 
                    employee_id: employee_id,
                    date: date
                }
        },
        update:{
            is_available:isAvailable,
            note:note ?? undefined,
            start_time:start_time ?? undefined,
            end_time:end_time ?? undefined

        },
        create:{
            employee_id:employee_id,
            date: date,
            is_available:isAvailable,
            note:note ?? null,
            start_time:start_time ?? null,
            end_time:end_time ?? null
        }

        })

        res.json({success:true,row})
    }catch(err){
        console.error(err)
    }
    


})

export default override