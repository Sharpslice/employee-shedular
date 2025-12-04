import express from 'express';
import shift from './shift'
import employee from './employee'
import override from './override';
const index = express.Router();
const employeeRoute = employee
const shiftRoute = shift
const overrideRoute=override
index.use('/',employeeRoute)
index.use('/shift',shiftRoute)
index.use('/override',overrideRoute)

export default index