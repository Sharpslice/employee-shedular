import express from 'express';
import { schedule } from '../controllers/employeeControllers';
import employeeShiftsRoute from './employeesShifts';
const employees = express.Router();


employees.get('/schedule-overview/:view/:date',schedule)

employees.use('/:employee_id/shifts',employeeShiftsRoute)

export default employees;

