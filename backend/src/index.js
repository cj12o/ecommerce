import dotenv from "dotenv"
import app from './app.js'
import Dbconn from "./database/db.js"

dotenv.config({
    path:"./.env"
})



const PORT=process.env.PORT
const db=new Dbconn()

db.isDBconnected()
    .then(
        app.listen(PORT,()=>{
            console.log(`App listening on http://localhost:3000/`)
        })
    )
    .catch((e)=>{
        console.log(`Error in connecting to Database : ${e}`)
    })



