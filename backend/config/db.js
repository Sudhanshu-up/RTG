import mongooose, { connect } from "mongoose";
import dns from "dns";


const connectdb = async()=>{
    dns.setServers(['8.8.8.8','8.8.4.4']);
    try {
        const connecation = await mongooose.connect(process.env.MONGO_URI);
        console.log(`MONGODB connected !!!!!!`)
    } catch (error) {
        console.log(`MONGODB connection failed !!${error.message}`);
        process.exit(1);
    }

};

export default connectdb;