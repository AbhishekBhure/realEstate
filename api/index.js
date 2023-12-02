import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRoutes from "./routes/userRoute.js";

const app = express();

dotenv.config()

mongoose.connect(process.env.MONGO_ATLAS_URL).then(() => {
  console.log('Connected to DB');
}).catch((err) =>{
  console.log(err)
})

app.get("/", (req, res) => {
  res.send("Hi");
});

app.use('/api/v1/users',userRoutes)


app.listen(process.env.PORT, () => {
  console.log(`Server Running on port: ${process.env.PORT}`);
});
