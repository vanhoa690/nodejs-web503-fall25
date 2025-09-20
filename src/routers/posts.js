import { Router } from "express";

const postRouter = Router();

postRouter.get("/", (req, res) => {
  res.send("Post");
});

export default postRouter;
