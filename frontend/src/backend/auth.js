import axios from "axios";
import Apierror from "../../../backend/src/utils/api-error";
import { useDispatch, useSelector } from "react-redux";
import { login as reducerLogin,logout as reducerLogout } from "../store/authSlice.js";



const login= async (email,password,dispatch) => {
    // const dispatch=useDispatch()
    try{
        ///LEARNING return here return promise to submit handler 
        // if there is no return axios then undefined gets returned 
        const resp=await axios.post(import.meta.env.VITE_LOGIN_EPT, 
        {email,password},
        {
            headers:{"Content-Type":"application/json"},
            withCredentials:true
        })

        if(resp.status>200){
            console.log("no cookie sent")
            dispatch(reducerLogout({}))
            return
        }

        const cookie=resp.data?.data?.cookie
        console.log("Auth js full data=>",resp.data)
        console.log("Dispatching login with payload:", {cookie});
        dispatch(reducerLogin({cookie}))
        return resp.status
    }
    catch(e){
        const error=e.response?.data?.errors?.[0]||"unknown error"
        // console.log(`auth js=>${e.response.data.errors[0]}`)
        throw new Apierror(409,error)
    }
}

const signup=async(name,email,password)=>{
    try{
        const resp=await axios.post(import.meta.env.VITE_SIGNUP_EPT,
            {name,email,password},
            {headers:{"Content-Type": "application/json" }})

        console.log("Auth JS ,signup=>",resp.data)
        return resp.status
    }catch(e){
        const error=e.response?.data?.errors?.[0]||"unkown error"
        console.log("Error Auth js signup=>",error)
        throw new Apierror(409,error)
    }
}

export {login,signup}
