import express from "express";
import postRouter from "../routers/posts";
import morgan from "morgan";

const app = express();

// Middleware log request
// const logRequest = (req, res, next) => {
//   console.log(`Log request ${req.method} ${req.url}`);
//   next();
// };

// // Đặt middleware này trước các route
// app.use(logRequest);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Homepage" });
});

app.use("/posts", postRouter);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
