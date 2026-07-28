import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.use("/users",userRouter);

app.get('/',(req, res)=>{
    res.send(`helloe sudhanshu !!`)
})


export default app;

