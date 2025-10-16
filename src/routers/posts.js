import { Router } from "express";
import Post from "../models/post.model";
import { checkAuth } from "../middlewares/checkAuth";
const postRouter = Router();

postRouter.use(checkAuth);
// GET /api/posts - Lấy danh sách bài viết
postRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ error: "Lỗi server", message: err.message });
  }
});

// GET /api/posts/:id - Lấy chi tiết bài viết
postRouter.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");
    if (!post)
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ error: "Lỗi server", message: err.message });
  }
});

// POST /api/posts - Thêm bài viết mới
postRouter.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    return res.status(201).json(newPost);
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Lỗi khi thêm bài viết", message: err.message });
  }
});

// PUT /api/posts/:id - Cập nhật bài viết
postRouter.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post)
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    return res.json(post);
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Lỗi khi cập nhật bài viết", message: err.message });
  }
});

// DELETE /api/posts/:id - Xóa bài viết
postRouter.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post)
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Lỗi server", message: err.message });
  }
});

export default postRouter;
