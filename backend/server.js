import app from "./app.js";
import dotenv from "dotenv";
import connectdb from "./config/db.js";

dotenv.config();


const PORT = process.env.PORT || 8000;


const startServer = async()=>{
    try {
        await connectdb();
        app.listen(PORT,()=>{
            console.log(`srever running at PORT : ${PORT}`);
        })
    } catch (error) {
        console.log(`Error : ${error.message}`)
        
    }

}

startServer();

export default  startServer;