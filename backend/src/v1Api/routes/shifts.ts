import express from 'express';
import { copyOverLastWeek, deleteShift, moveShift } from '../controllers/shift.controller';
import { validateDeleteShift } from '../middleware/shift.middleware/validateDeleteShift';
import { validateMoveShift } from '../middleware/shift.middleware/validateMoveShift';
import { validateCopyLastWeekShift } from '../middleware/shift.middleware/validateCopyLastWeek';


const shifts = express.Router();

shifts.post('/copyOverLastWeek',
    validateCopyLastWeekShift,
    copyOverLastWeek)

shifts.delete('/:id',
    validateDeleteShift,
    deleteShift)

shifts.patch('/:id',
    validateMoveShift,
    moveShift)



export default shifts