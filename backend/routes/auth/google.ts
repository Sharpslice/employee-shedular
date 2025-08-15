import express from 'express';
import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import prisma from '../../db/db';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
const google = express.Router();
dotenv.config();

interface AuthenticatedUser extends Request{
    id: number,
    googleId: string
    name: string
    role: string
}

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ??"",
    callbackURL: "http://localhost:3000/auth/google/callback"


},async(accessToken, refreshToken, profile,done)=>{
    try{
        console.log(profile)
        let user = await prisma.user.upsert({
            where:{
                googleId: profile.id
            },
            update:{},
            create:{
                googleId: profile.id,
                name: profile.displayName
            },
        })
        return done(null,user)
        
    }catch(error){
        return done(error,undefined)
    }   

   
}),)


google.get('/',passport.authenticate('google',{scope: ['profile','email'],prompt: 'select_account'}))
google.get('/callback',passport.authenticate('google',{session:false}),(req,res)=>{
    const user = req.user as AuthenticatedUser;
    console.log(user)
    const token = jwt.sign(
        {
            id:user.googleId,
            name: user.name,
            role:user.role

        },
        process.env.JWT_SECRET?? '',
        {expiresIn: '1h'}
    )

    //res.json({user,token})
    res.redirect("http://localhost:5173/schedule")
})
export default google;