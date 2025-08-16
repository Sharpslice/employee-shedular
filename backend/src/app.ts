import express from 'express';
import cors from 'cors';
import google from '../routes/auth/google';
import calendarApi from '../routes/calendar/calendar';
import dotenv from "dotenv";
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true              // allow cookies (if using sessions)
}));
app.use(express.json())

dotenv.config();

const googleRouter = google;
const calendarRoute = calendarApi
app.use('/auth/google',googleRouter);
app.use('/api/calendar',calendarRoute)
app.listen(3000,()=>{
    console.log("server running on port 3000")
})