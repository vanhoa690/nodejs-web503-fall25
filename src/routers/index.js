import { Router } from "express";
import postRouter from "./post";
import userRouter from "./user";
import productRouter from "./product";

const router = Router();

// Định nghĩa route GET /

// .get : Method HTTP: GET
// "/": Endpoint API - URL
// function (req, res) :
// req: du lieu gui tu client (Frontend)
// res: du lieu server tra ve cho client (FE)
// app.get("/", (req, res) => {
//   res.send("Hello, chao cac ban");
// });

router.get("/", (req, res) => {
  res.send("Hello, chao cac ban");
});

// gom api posts
router.use("/posts", postRouter);

// gom api users
router.use("/users", userRouter);

// gom api products
router.use("/products", productRouter);

export default router;
