import express from "express";
import postRouter from "../routers/posts";
import morgan from "morgan";

const app = express();

// Middleware tích hợp để parse JSON
app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Homepage" });
});

app.use("/posts", postRouter);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
