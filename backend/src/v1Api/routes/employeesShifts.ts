import express from "express"; 
import { Request,Response } from "express";
import prisma from "../../../db/db";
import { io } from "../../app";
import { createShift, updateShiftTimes } from "../controllers/employeeShift.controller";
import { validateCreateShift } from "../middleware/employeeShift.middleware/validateCreateShift";
import { validateUpdateShiftTime } from "../middleware/employeeShift.middleware/validateUpdateShiftTime";


const employeeShifts = express.Router({mergeParams:true});

employeeShifts.post('/',
    validateCreateShift,
    createShift)

employeeShifts.patch('/:shift_id',
    validateUpdateShiftTime,
    updateShiftTimes)




export default employeeShifts;