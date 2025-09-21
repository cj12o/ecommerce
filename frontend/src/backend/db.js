import mongoose from "mongoose";
import { drizzle } from 'drizzle-orm/node-postgres';
try{
    const db = drizzle(process.env.DATABASE_URL);
    console.log("Succesfully connected to Database")
    db.execute()
}catch(e){
    throw e
}

export default db