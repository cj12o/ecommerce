import axios from "axios";
import Apierror from "../../../backend/src/utils/api-error";

const login= async (email,password) => {
    try{
        ///LEARNING return here return promise to submit handler 
        // if there is no return axios then undefined gets returned 
        const resp=await axios.post("http://localhost:3000/api/v1/auth/login", 
        {email,password},
        {headers: { "Content-Type": "application/json" } })


        
        // .then((data)=>{
        //     console.log("✅SUCCESS =>",data)
        //     return data
        // })
        return resp.status
    }
    catch(e){
        const error=e.response.data.errors[0]
        // console.log(`auth js=>${e.response.data.errors[0]}`)
        throw new Apierror(200,error)
    }
};

export {login}
