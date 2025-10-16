import { Router } from "express";
import Author from "../models/author.model";
import Joi from "joi";
import { checkAuth, restrictTo } from "../middlewares/checkAuth";

const authorRouter = Router();
// authorRouter.use(checkAuth);

const creatSschema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  bio: Joi.string().optional().max(500),
});

const updateSschema = Joi.object({
  name: Joi.string().optional().min(2).max(100).disallow(""),
  bio: Joi.string().optional().max(500),
});

// GET /api/authors - Lấy danh sách tác giả
authorRouter.get("/", async (req, res) => {
  try {
    const { _page = 1, _limit = 10, name } = req.query;

    // tạo điều kiện lọc
    const filter = {};

    // tìm kiếm theo tên (không phân biệt hoa thường)
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    // options phân trang
    const options = {
      page: parseInt(_page),
      limit: parseInt(_limit),
      sort: { createdAt: -1 }, // sắp xếp mới nhất trước
    };
    const authors = await Author.paginate(filter, options);
    return res.json(authors);
  } catch (err) {
    return res.status(500).json({ error: "Lỗi server", message: err.message });
  }
});

// GET /api/authors/:id - Lấy chi tiết tác giả
authorRouter.get("/:id", checkAuth, async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author)
      return res.status(404).json({ error: "Không tìm thấy tác giả" });
    return res.json(author);
  } catch (err) {
    return res.status(500).json({ error: "Lỗi server", message: err.message });
  }
});
// authorRouter.use(restrictTo("admin", "staff"));
// AUTHOR /api/authors - Thêm tác giả mới
authorRouter.post(
  "/",
  checkAuth,
  restrictTo("admin", "staff"),
  async (req, res) => {
    try {
      const { error } = creatSschema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: "Lỗi khi thêm tác giả",
          details: error.details.map((err) => err.message),
        });
      }
      const newAuthor = await Author.create(req.body);
      return res.status(201).json(newAuthor);
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Lỗi khi thêm tác giả", message: err.message });
    }
  }
);

// PUT /api/authors/:id - Cập nhật tác giả
authorRouter.put("/:id", async (req, res) => {
  try {
    const { error } = updateSschema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: "Lỗi khi sửa tác giả",
        details: error.details.map((err) => err.message),
      });
    }
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!author)
      return res.status(404).json({ error: "Không tìm thấy tác giả" });
    return res.json(author);
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Lỗi khi cập nhật tác giả", message: err.message });
  }
});

// DELETE /api/authors/:id - Xóa tác giả
authorRouter.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author)
      return res.status(404).json({ error: "Không tìm thấy tác giả" });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Lỗi server", message: err.message });
  }
});

export default authorRouter;
