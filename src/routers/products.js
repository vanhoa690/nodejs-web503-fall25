import { Router } from "express";
import Product from "../models/product.model";

const productRouter = Router();

// GET /api/products - Lấy danh sách sản phẩm
productRouter.get("/", async (req, res) => {
  try {
    const { _page = 1, _limit = 10, name, minPrice, maxPrice } = req.query;

    // tạo điều kiện lọc
    const filter = {};

    // tìm kiếm theo tên (không phân biệt hoa thường)
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    // lọc theo khoảng giá
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    console.log(filter);

    // options phân trang
    const options = {
      page: parseInt(_page),
      limit: parseInt(_limit),
      sort: { createdAt: -1 }, // sắp xếp mới nhất trước
    };
    const products = await Product.paginate(filter, options);
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
