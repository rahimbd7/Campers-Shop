import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"


const app:Application = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Hello World!");
});





export default app
