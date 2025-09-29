import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import postRouter from "./routers/posts";

const app = express();

// Middleware tích hợp để parse JSON
app.use(express.json());

app.use(morgan("dev"));

mongoose
  .connect(`mongodb://127.0.0.1:27017/test_web503_nodejs`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.get("/", (req, res) => {
  res.json({ message: "Homepage" });
});

app.use("/posts", postRouter);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
