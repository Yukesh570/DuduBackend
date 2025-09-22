
import express from "express"
import "reflect-metadata";

import cors from "cors"
import { initializeDB } from "./db";
import { router } from "./route/route";
import path from "path";
import 'tsconfig-paths/register';

const port = process.env.PORT || 3000;

const app=express()

app.use(express.json())
app.use(express.static("public/images"));
app.use('/videos', express.static(path.join(__dirname, '../public/videos')));

app.use(cors({
    origin: "*"
}))
app.use("/api",router)
app.get("/",(req,res)=>{
    res.send("working");
})


app.listen(port,async()=>{
    await initializeDB(),
    console.log(`server is running on port ${port}`)
})