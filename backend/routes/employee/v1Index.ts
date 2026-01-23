import express from 'express';
import shiftRoute from './shifts'
import employeeRoute from './employees'
import overrideRoute from './overrides';
const index = express.Router();

index.use('/employees',employeeRoute)
index.use('/shifts',shiftRoute)
index.use('/overrides',overrideRoute)

export default index