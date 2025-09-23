import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv"

class Dbconn {
  conn
  client
    constructor() {
        try {
            this.client = new Client({
                user:String(process.env.DATABASE_USER),
                database:String(process.env.DATABASE_NAME),
                password:String(process.env.DATABASE_PASSWORD),
                port:Number(process.env.DATABASE_PORT),
                host:String(process.env.DATABASE_HOST),
                connectionString:String(process.env.DATABASE_URL)
            })
            this.client.connect();
            this.conn =drizzle(this.client)
        }
        catch (e) {
            throw e
        }
    }

    async isDBconnected() {
        try {
            const result=await this.client.query("SELECT 1");
            console.log("✅ Connection successful result",result.rows)
            return true;
        } catch (e) {
            console.log(`host:String(${process.env.DATABASE_HOST}),`)
            console.error(`❌ Connection not successful, ERROR:`, e);
            return false;
        }
    }
}

export default Dbconn
