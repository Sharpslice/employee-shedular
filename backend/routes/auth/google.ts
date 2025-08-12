import express from 'express';
import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
const google = express.Router();


passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ??"",
    callbackURL: "http://localhost:3000/auth/google/callback"


},async(accessToken, refreshToken, profile,done)=>{


   
}),)



google.get('/',(req,res)=>{

})
export default google;