import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hi");
});
app.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});
