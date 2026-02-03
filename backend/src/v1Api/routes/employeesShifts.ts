import express from "express"; 
import { Request,Response } from "express";

import { createShift, updateShiftTimes } from "../controllers/employeeShift.controller";
import { validateCreateShift } from "../middleware/employeeShift.middleware/validateCreateShift";
import { validateUpdateShiftTime } from "../middleware/employeeShift.middleware/validateUpdateShiftTime";
import { authenticateAdmin } from "../middleware/auth.middleware/authenticateAdmin";


const employeeShifts = express.Router({mergeParams:true});

employeeShifts.post('/',
    validateCreateShift,
    createShift)

employeeShifts.patch('/:shift_id',
    validateUpdateShiftTime,
    updateShiftTimes)




export default employeeShifts;