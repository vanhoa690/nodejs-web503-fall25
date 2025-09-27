import { Router } from "express";

import { addPost, getPostById, getPosts } from "../controllers/post";

const postRouter = Router();

let posts = [
  { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
  { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
  { id: 3, title: "Bài viết 2", content: "Nội dung bài viết 2" },
  { id: 4, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];

// GET /api/posts - Lấy danh sách bài viết
postRouter.get("/", getPosts);

// GET /api/posts/:id - Lấy chi tiết bài viết
postRouter.get("/:id", getPostById);

// POST /api/posts - Thêm bài viết mới
postRouter.post("/", addPost);

// DELETE /api/posts/:id - Xóa bài viết
postRouter.delete("/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  console.log("index", index);

  if (index === -1) return res.status(404).json({ error: "Post not found" });

  posts.splice(index, 1);
  res.json({ success: true });
});

// PUT /api/posts/:id - Cập nhật bài viết
postRouter.put("/:id", (req, res) => {
  console.log(typeof req.params.id);

  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });

  const { title, content } = req.body;
  post.title = title || post.title;
  post.content = content || post.content;

  res.json(post);
});

export default postRouter;
