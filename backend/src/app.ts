import express from 'express';
import cors from 'cors';
import {Server} from 'socket.io';
import http from 'http';

import passport from 'passport';
import session from "express-session";
import googleRouter from '../routes/auth/google';
import calendarRouter from '../routes/calendar/calendar';
import dotenv from "dotenv";

import apiV1Router from '../routes/employee/v1Index'
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

app.use(
  session({
    secret: "keyboard cat", // must exist
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // true if using HTTPS
  } as any)  // type assertion
);

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth/google',googleRouter);
app.use('/api/calendar',calendarRouter)
app.use('/api/v1',apiV1Router)



io.on("connection",(socket)=>{
  console.log('New client connected:', socket.id);
  socket.emit("Welcome","Hello from server!");
  socket.on("disconnect",()=>{
    console.log("client disconnected:", socket.id)
  })
})

server.listen(3000,()=>{
    console.log("server running on port 3000")
})

export {io}