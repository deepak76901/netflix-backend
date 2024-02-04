import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/user.routes.js";
import dotenv from "dotenv";
import path from "path"

dotenv.config({
  path: "./.env",
});

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve("build")))

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected Successfully");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

app.use("/api/user", router);

app.get("/", (req, res) => {
  res.send("Hello world,kya hal chal");
});

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on PORT: http://localhost:${process.env.PORT}`)
);
