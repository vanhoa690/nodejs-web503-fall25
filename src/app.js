import express from "express";
import postRouter from "./routers/posts";

const app = express();

// Định nghĩa route GET /
// app = express()
// .get : Method HTTP: GET
// "/": Endpoint API - URL
// function (req, res) :
// req: du lieu gui tu client (Frontend)
// res: du lieu server tra ve cho client (FE)
app.get("/", (req, res) => {
  res.send("Hello, chao cac ban");
});

// app.use : su dung tien to router: /posts
// postRouter: toan bo routing co trong postRouter
app.use("/api/posts", postRouter);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
