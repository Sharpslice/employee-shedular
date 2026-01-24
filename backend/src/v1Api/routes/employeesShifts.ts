import express from "express"; 
import { Request,Response } from "express";
import prisma from "../../../db/db";
import { io } from "../../app";
import { createShift, updateShiftTimes } from "../controllers/employeeShiftsController";


const employeeShifts = express.Router({mergeParams:true});

employeeShifts.post('/',createShift)

employeeShifts.patch('/:shift_id',updateShiftTimes)




export default employeeShifts;