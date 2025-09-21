import { Router } from "express";

const postRouter = Router();

postRouter.get("/", (req, res) => {
  console.log(req.query?.name);
  res.send("Post" + req.query?.name);
});

// endpoint: api/posts/greet
postRouter.get("/detail/:id", (req, res) => {
  res.send("Post detail co id la: " + req.params?.id);
});

export default postRouter;
