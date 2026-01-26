import express from 'express';
import { copyOverLastWeek, deleteShift, moveShift } from '../controllers/shift.controller';


const shifts = express.Router();

shifts.post('/copyOverLastWeek',copyOverLastWeek)

shifts.delete('/:id',deleteShift)

shifts.patch('/:id',moveShift)



export default shifts