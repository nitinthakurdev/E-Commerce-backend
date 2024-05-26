import DBConnection from "./DB/index.js"
import { app } from "./app.js"


const Port  = process.env.PORT || 4001

DBConnection().then(()=>{
    app.listen(Port,()=>{
        console.log(`server is running at Port : ${Port}`)
    })
}).catch((err)=>{
    console.log("database connection error")
})