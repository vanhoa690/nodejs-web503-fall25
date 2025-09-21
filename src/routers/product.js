import { Router } from "express";

const productRouter = Router();

productRouter.get("/", (req, res) => {
  res.send("product");
});

// endpoint: api/products/greet
productRouter.get("/greet", (req, res) => {
  res.send("product greet");
});

export default productRouter;
