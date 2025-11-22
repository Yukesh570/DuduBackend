
import express from "express"
import "reflect-metadata";

import cors from "cors"
import { initializeDB } from "./db";
import { router } from "./route/route";
import path from "path";
import 'tsconfig-paths/register';

const port = process.env.PORT || 3000;

const app=express()
app.use(cors({
  origin: "*",             // you can restrict later
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json())
app.use('/serviceList', express.static(path.join(__dirname, '../public/serviceList')));
app.use('/services', express.static(path.join(__dirname, '../public/services')));
app.use('/tenants', express.static(path.join(__dirname, '../public/tenants')));

app.use('/videos', express.static(path.join(__dirname, '../public/videos')));

// app.use(cors({
//     origin: "*"
// }))
app.use("/api",router)
app.get("/", (req, res) => {
    res.send("working");
});

// app.listen(port,async()=>{
//     await initializeDB(),
//     console.log(`server is running on port ${port}`)
// })


(async () => {
  await initializeDB(); // ✅ DB ready before using LoginDao
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();