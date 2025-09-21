import express, { urlencoded } from "express"


const app=express()

app.use(express.json({limit:"16kb"}))
app.use(urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

app.get('/',(req,resp)=>{
    resp.send("hi")
})

export default app


