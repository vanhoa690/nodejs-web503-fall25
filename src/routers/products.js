import { Router } from "express";
import Product from "../models/product.model";

const productRouter = Router();

// GET /api/products - Lấy danh sách sản phẩm
productRouter.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    const products = await Product.paginate({}, options);

    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: "Lỗi server", message: err.message });
  }
});

// GET /api/products/:id - Lấy chi tiết sản phẩm
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ error: "Lỗi server", message: err.message });
  }
});

// PRODUCT /api/products - Thêm sản phẩm mới
productRouter.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Lỗi khi thêm sản phẩm", message: err.message });
  }
});

// PUT /api/products/:id - Cập nhật sản phẩm
productRouter.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product)
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    return res.json(product);
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Lỗi khi cập nhật sản phẩm", message: err.message });
  }
});

// DELETE /api/products/:id - Xóa sản phẩm
productRouter.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Lỗi server", message: err.message });
  }
});

export default productRouter;
