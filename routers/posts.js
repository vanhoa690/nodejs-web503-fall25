import { Router } from "express";
const postRouter = Router();

// GET /hello?name=Teo
postRouter.get("/", (req, res) => {
  const name = req.query.name || "bạn"; // Lấy giá trị 'name' từ query string
  res.json({ message: `Xin chào, ${name}!` }); // Trả về JSON với lời chào
});

// GET /posts/:id
postRouter.get("/:id", (req, res) => {
  const id = req.params.id; // Lấy giá trị 'id' từ URL
  res.json({ id, message: "Chi tiết bài viết" }); // Trả về JSON với thông tin bài viết
});

export default postRouter;
