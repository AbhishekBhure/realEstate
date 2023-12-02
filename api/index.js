import express from "express";
import dotenv from "dotenv"
import mongoose, { mongo } from "mongoose";

const app = express();
const PORT = 3000;

dotenv.config()

mongoose.connect(process.env.MONGO_ATLAS_URL).then(() => {
  console.log('Connected to DB');
}).catch((err) =>{
  console.log(err)
})

app.get("/", (req, res) => {
  res.send("Hi");
});
app.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});
