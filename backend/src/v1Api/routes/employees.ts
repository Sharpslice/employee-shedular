import express from 'express';
import { schedule } from '../controllers/employee.controllers';
import employeeShiftsRoute from './employeesShifts';
import { validateSchedule } from '../middleware/employee.middleware/validateSchedule';
const employees = express.Router();


employees.get('/schedule-overview/:view/:date',
    validateSchedule,
    schedule)

employees.use('/:employee_id/shifts',employeeShiftsRoute)

export default employees;

