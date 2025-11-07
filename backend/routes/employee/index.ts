import express from 'express';
import shift from './shift'
import employee from './employee'
const index = express.Router();
const employeeRoute = employee
const shiftRoute = shift

index.use('/',employeeRoute)
index.use('/shift',shiftRoute)


export default index