import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"
import router from "./app/routes/routes";


const app:Application = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use('/api', router)


export default app
