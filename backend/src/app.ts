import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"
import router from "./app/routes/routes";


const app:Application = express();


// app.use(cors({origin:["http://localhost:5173","http://localhost:5174","https://campers-shop-frontend-phi.vercel.app/"],credentials:true}));
// List of allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://campers-shop-frontend-phi.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like Postman
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // required for cookies
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api', (req, res) => {
    res.json({
        success: true,
        path: req.path,
        message: "You are in the base API route. Navigate further, e.g., /api/products/get-all-products, /api/category etc.",
    });
});


app.use('/api', router)


export default app
