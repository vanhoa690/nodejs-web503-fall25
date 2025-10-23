import { Router } from "express";
import {
  create,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../controller/Course";

const router = Router();
router.get("/courses", getAll);
router.post("/courses", create);
router.get("/courses/:id", getById);
router.put("/courses/:id", updateById);
router.delete("/courses/:id", deleteById);

export default router;
