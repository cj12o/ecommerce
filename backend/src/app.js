import express, { urlencoded } from "express"
import authrouter from "./routes/auth.route.js"
import cors from "cors"

const app=express()

app.use(express.json({limit:"16kb"}))
app.use(urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cors({
    origin:process.env.CORS_ORIGIN?.split(",")||"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
}))



app.get('/',(req,resp)=>{
    resp.send("hi")
})


app.use("/api/v1/auth",authrouter)
export default app


