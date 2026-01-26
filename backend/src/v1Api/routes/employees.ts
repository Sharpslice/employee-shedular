import express from 'express';
import { schedule } from '../controllers/employee.controllers';
import employeeShiftsRoute from './employeesShifts';
import { validateSchedule } from '../middleware/employee.middleware/validateSchedule';
import employeeAvailabilitiesRoute from './employeeAvailability';
const employees = express.Router();


employees.get('/schedule-overview/:view/:date',
    validateSchedule,
    schedule)



employees.use('/:employee_id/shifts',employeeShiftsRoute)
//employees.use('/:employee_id/availabilities',employeeAvailabilitiesRoute)
export default employees;

