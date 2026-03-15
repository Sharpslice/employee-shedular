import express from "express"; 
import { Request,Response } from "express";

import { createShift, updateShiftTimes } from "../controllers/employeeShift.controller";
import { validateCreateShift } from "../middleware/employeeShift.middleware/validateCreateShift";
import { validateUpdateShiftTime } from "../middleware/employeeShift.middleware/validateUpdateShiftTime";
import { authenticateAdmin } from "../middleware/auth.middleware/authenticateAdmin";
import { normalize } from "path";
import { normalizeTime } from "../middleware/shift.middleware/normalizeTime";


const employeeShifts = express.Router({mergeParams:true});

employeeShifts.post('/',
    validateCreateShift,
    normalizeTime,
    createShift)

employeeShifts.patch('/:shift_id',
    validateUpdateShiftTime,
    updateShiftTimes)




export default employeeShifts;