import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";
import InquiryRouter from "./routes/inquiryRouter.js";
import cors from "cors";

//mongo url and secret part hiding part
dotenv.config();


let app = express();
app.use(cors());
app.use(bodyParser.json());



app.use((req, res, next) => {
    
    let  token = req.header
    ("Authorization")

    if(token != null){
        token = token.replace("Bearer", "")
    
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decode) => {

                if(!err){
                    req.user = decode;
                }
    })

        

    }
    next();

    //console.log(token)
});



//mongo db drive link
let mongoDb = process.env.MONGO_URL;



//connect mongodb
mongoose.connect(mongoDb);

let Connection = mongoose.connection;

Connection.once("open", () => {

    console.log("connection sucessful")

})




app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/review", reviewRouter);
app.use("/api/inqiuiry", InquiryRouter);




//local host connector

app.listen(3000, () => {
    console.log("server is running");
});




//"email": "johndoe21@example.com",
//"password": "password12356",


//"email": "admin89@example.com",
//"password": "password1235",
