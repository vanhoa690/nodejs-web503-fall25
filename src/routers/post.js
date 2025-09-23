import { Router } from "express";

const postRouter = Router();

postRouter.get("/", (req, res) => {
  res.send("Post");
});

// endpoint: api/posts/detail/:id
postRouter.get("/detail/:id", (req, res) => {
  res.send("Post detail co id la: " + req.params?.id);
});

// /api/posts
postRouter.post("/", (req, res) => {
  // body: title
  console.log(req.body);
  res.json({ body: req.body });
});

export default postRouter;
