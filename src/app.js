import express from "express";
import morgan from "morgan";

import postRouter from "./routers/post";

const app = express();

// Dùng morgan để log ở chế độ 'dev'
app.use(morgan("dev"));

// Middleware tích hợp để parse JSON: req.body
app.use(express.json());

// localhost":3000
app.get("/", (req, res) => {
  res.send("Hello, chao cac ban: ");
});

app.use("/api/posts", postRouter);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
