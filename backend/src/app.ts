import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"
import router from "./app/routes/routes";


const app:Application = express();


app.use(cors({origin:["http://localhost:5173","http://localhost:5174"],credentials:true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Welcome to campers shop backend! ");
});


app.use('/api', router)


export default app
