import express from "express";
import mongoose from "mongoose";
import { videoRoutes } from "./routes/videoRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { channelRoutes } from "./routes/channelRoutes.js";
import {commentRoutes} from "./routes/commentRoutes.js";


mongoose.connect("mongodb://localhost:27017/"); //connect to mongodb compass database
//all the code below is just to see if the connection is working or not
const db=mongoose.connection;
db.on("open", ()=>{
    console.log("connection successful");
});
db.on("error", ()=>{
    console.log("connection unsucessfull");
});

const app=new express();// initialize the Express app
//make a server
app.listen(5100, ()=>{
    console.log("server is running on port 5100");
});

app.use(express.json()); //to parse the incoming json

videoRoutes(app);
userRoutes(app);
channelRoutes(app);
commentRoutes(app);