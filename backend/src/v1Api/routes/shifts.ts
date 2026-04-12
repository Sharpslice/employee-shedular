import express from 'express';
import { copyOverLastWeek, deleteShift, moveShift } from '../controllers/shift.controller';
import { validateDeleteShift } from '../middleware/shift.middleware/validateDeleteShift';
import { validateMoveShift } from '../middleware/shift.middleware/validateMoveShift';
import { validateCopyLastWeekShift } from '../middleware/shift.middleware/validateCopyLastWeek';
import { authenticateAdmin } from '../middleware/auth.middleware/authenticateAdmin';
import { normalizeTime } from '../middleware/shift.middleware/normalizeTime';


const shifts = express.Router();

shifts.post('/copyOverLastWeek',
    validateCopyLastWeekShift,
    copyOverLastWeek)

shifts.delete('/:id',
    validateDeleteShift,
    deleteShift)

shifts.patch('/:id',
    // validateMoveShift,
    // normalizeTime,
    moveShift)



export default shifts