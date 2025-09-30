import express from "express";
import morgan from "morgan";

import postRouter from "./routers/post";
import mongoose from "mongoose";

const app = express();

// Dùng morgan để log ở chế độ 'dev'
app.use(morgan("dev"));

// Middleware tích hợp để parse JSON: req.body
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/nodejs")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// localhost":3000
app.get("/", (req, res) => {
  res.send("Hello, chao cac ban: ");
});

app.use("/api/posts", postRouter);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
