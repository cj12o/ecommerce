import Apierror from "../utils/api-error.js"
import Apiresponse from "../utils/api-response.js"
import db from "../index.js"
import userSchema from "../models/user.models.ts"
import { eq } from "drizzle-orm" 
import bcrypt from "bcrypt"
const loginUser=async(req,resp)=>{
    try{
        const {email,password}=req.body
        
        if(!email || !password) throw new Error("Error in Authentication,Incomplete Details")
       
        const emailRegObj=await db.conn.select({email:userSchema.email}).from(userSchema).where(eq(userSchema.email,email));
        const emailReg=emailRegObj[0]['email']
        
        if(!emailReg) throw new Error("No such User")
        
        const passwordRegObj=await db.conn.select({password:userSchema.password}).from(userSchema).where(eq(userSchema.email,email))
        const passwordReg=passwordRegObj[0]['password']

        const hashedPasswordReg=1
        const saltRounds=10
        
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                console.log("HASHED=>",hash)
            });
        });
        
        if(passwordReg!=password) throw new Error("Invalid credentials")
        return resp
            .status(200)
            .json(new Apiresponse(200,"user Succesfully logged in",{
                user_email:email,
                user_password:password
            }))
    }
    catch(e){
        const error_lst=[]
        error_lst.push(e.message)
        console.log(`❌❌ERROR=>${e.message}`)
        throw new Apierror(409,"error in login",error_lst)
    }
}


const signupUser=async (req,resp)=>{
    try{
        const {name,email,password}=req.body
        const result=await db.conn.insert(userSchema).values({
            'name':name,
            'email':email,
            'password':password
        }).returning()

        // const getUser=await db.conn.select(userSchema.name).from(userSchema).where(eq(userSchema.email,email))
        // if(!isInserted) throw new Error("error in inserting in DB")
        // const isUserInserted=getUser[0]['email']
        if(result){
            return resp
                .status(200)
                .json(new Apiresponse(200,"user succesfully signed up",{
                    user_name:name,
                    user_email:email,
                    user_password:password
                }))
        }
        throw new Error("Error in inserting into database")
    }catch(e){
        const error_lst=[]
        error_lst.push(e.message)
        console.log(`❌❌ERROR=>${e.message}`)
        throw new Apierror(409,"error in signup",error_lst)
        //apierror
    }
}



export {loginUser,signupUser}