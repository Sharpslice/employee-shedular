import express from 'express';
import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import prisma from '../../db/db';
import dotenv from "dotenv";
const google = express.Router();
dotenv.config();


passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ??"",
    callbackURL: "http://localhost:3000/auth/google/callback"


},async(accessToken, refreshToken, profile,done)=>{
    try{
        console.log(profile)
        //let user = await prisma.User.findUnique({where:{id:profile.id}})
        return done(null,profile)
        
    }catch(error){
        
    }   

   
}),)


google.get('/',passport.authenticate('google',{scope: ['profile','email'],prompt: 'select_account'}))
google.get('/callback',passport.authenticate('google',{session:false}),(req,res)=>{
    res.redirect('http://localhost:5173/');
})
export default google;