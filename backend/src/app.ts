import express from 'express';
import cors from 'cors';
import google from '../routes/auth/google';

const app = express();
app.use(cors())
app.use(express.json())

const googleRouter = google;
app.use('/auth/google',googleRouter);
app.listen(3000,()=>{
    console.log("server running on port 3000")
})