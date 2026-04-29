import express from 'express';
import shiftRoute from './shifts'
import employeeRoute from './employees'
import overrideRoute from './overrides';
import availabilitiesRoute from './availabilities';
import { authenticateAdmin } from '../middleware/auth.middleware/authenticateAdmin';
const index = express.Router();

index.use('/employees',employeeRoute)
index.use('/shifts',shiftRoute)
//index.use('/availabilities',availabilitiesRoute)
//index.use('/overrides',overrideRoute)

export default index