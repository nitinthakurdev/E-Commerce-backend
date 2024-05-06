import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const DBConnection = async () => {
    try{
      const connected = await  mongoose.connect(process.env.MONGODB_URI,{dbName:DB_Name})
        console.log("MongoDB database is connected ",connected.connection.host)
    }catch(err){
        console.log("MongoDB Database Connection error",err)
        process.exit(1)
    }
}

export default DBConnection