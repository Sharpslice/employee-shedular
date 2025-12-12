import express from 'express';
import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import prisma from '../../db/db';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { Employee } from '../../src/generated/prisma';
const google = express.Router();
dotenv.config();

interface AuthenticatedUser extends Request{
    id: number,
    googleId: string
    name: string
    phoneNumber?:number
    role: string
    position:string
    color?: string
    isWorking: boolean
    picture?: string
}

passport.serializeUser((user,done)=>{
  const dbUser= user as Employee
  console.log(dbUser.id)
  return done(null,dbUser.id)
})
passport.deserializeUser(async (id: number, done) => {
  
  try {
    // fetch the user from your database
    const user = await prisma.employee.findUnique({ where: { id } });

    // Pass the full user object to Passport
    console.log("deserialize")
    done(null, user);
  } catch (err) {
    console.log('deserialzie error')
    done(err, undefined); // if error, pass it to Passport
  }
});


passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile);
      let user = await prisma.employee.upsert({
        where: { googleId: profile.id },
        update: {},
        create: {
          googleId: profile.id,
          name: profile.displayName || "",
          email: profile.emails?.[0]?.value || "",
          phone_number: null,
          role: "USER",
          color: null,
          isWorking: true,
          picture: profile._json.picture || ''
        },
      });
      
      return done(null, user);
    } catch (error) {
      return done(error, undefined);
    }
  }
) as any);


google.get('/',passport.authenticate('google',{scope: ['profile','email'],prompt: 'select_account'}))
google.get('/callback',passport.authenticate('google'),(req,res)=>{
    const user = req.user as AuthenticatedUser;
    
    //res.json({user,token})
    res.redirect("http://localhost:5173/schedule")
})

google.get('/logged-in-user',(req,res)=>{
  console.log(req.user)
  res.json({user:req.user});
})


export default google;