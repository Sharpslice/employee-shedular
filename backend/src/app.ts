import express from 'express';
import cors from 'cors';
import {Server} from 'socket.io';
import http from 'http';




import google from '../routes/auth/google';
import calendarApi from '../routes/calendar/calendar';
import dotenv from "dotenv";

import index from '../routes/employee/index'
const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials:true
  }
})


app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true              // allow cookies (if using sessions)
}));
app.use(express.json())

dotenv.config();

const googleRouter = google;
const calendarRoute = calendarApi
const indexRoute = index
app.use('/auth/google',googleRouter);
app.use('/api/calendar',calendarRoute)
app.use('/api/employee',indexRoute)

io.on("connection",(socket)=>{
  console.log('New client connected:', socket.id);
  socket.emit("Welcome","Hello from server!");
  socket.on("updateShift",(data)=>{
    console.log("Shift updated:", data);
    io.emit("shiftUpdated",data);
  })
  socket.on("disconnect",()=>{
    console.log("client disconnected:", socket.id)
  })
})

server.listen(3000,()=>{
    console.log("server running on port 3000")
})

export {io}