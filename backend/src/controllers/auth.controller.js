import Apierror from "../utils/api-error.js"
import Apiresponse from "../utils/api-response.js"
import db from "../index.js"
import userSchema from "../models/user.models.ts"
import { eq } from "drizzle-orm" 
import {v4 as uuidv4} from "uuid"

import { getUser ,setUser} from "../service/authService.js"

const loginUser=async(req,resp)=>{
    try{
        const {email,password}=req.body

        if(!email || !password) throw new Error("Error in Authentication,Incomplete Details")
       
        const emailRegObj=await db.conn.select({email:userSchema.email}).from(userSchema).where(eq(userSchema.email,email));
        
        try{
            const emailReg=emailRegObj[0]['email']
        }catch(e){
            throw new Error("No such User")
        }
        
        
        
        const passwordRegObj=await db.conn.select({password:userSchema.password}).from(userSchema).where(eq(userSchema.email,email))
        const passwordReg=passwordRegObj[0]['password']

        
        if(passwordReg!=password) throw new Error("Invalid credentials")
        //if everythin is ok 
        // 1)create sesh id
        const sessionId=uuidv4()
        const userIdReg=await db.conn.select({id:userSchema.id}).from(userSchema)
        const userId=userIdReg[0]['id']
        setUser(userId,sessionId)
        
        // resp.cookie('uuid',sessionId)
        
        return resp
            .status(200)
            .json(new Apiresponse(200,"user Succesfully logged in",{
                user_email:email,
                user_password:password,
                cookie:sessionId
            }))
    }
    catch(e){
        const error_lst=[]
        error_lst.push(e.message)
        // console.log(`❌❌ERROR=>${e.message}`)
        // throw new Apierror(409,"error in login",error_lst)
        return resp
            .status(409)
            .json(new Apierror(409,e.message,error_lst))
    }
}


const signupUser=async (req,resp)=>{
    try{
        const {name,email,password}=req.body

        const getUser=await db.conn.select({id:userSchema.id}).from(userSchema).where(eq(email,userSchema.email))
       
        if(getUser.length>=1 && getUser[0]['id']){
            throw new Error("User Already Exists")
        }
        
        const result=await db.conn.insert(userSchema).values({
            'name':name,
            'email':email,
            'password':password
        })
        console.log("RESULT=>",result)

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
        // throw new Apierror(409,"error in signup",error_lst)
        resp
            .status(409)
            .json(new Apierror(409,e.message,error_lst))
    }
}


// const generateAcessAndRefreshToken=async (userId)=>{
//     try{
//         const user=await db.conn.select({id:userSchema.id}).from(userSchema)
        
//     }
//     catch(e){

//     }
// }


export {loginUser,signupUser}