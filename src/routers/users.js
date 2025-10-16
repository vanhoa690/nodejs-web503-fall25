import { Router } from "express";
import User from "../models/user.model";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRouter = Router();

const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  email: Joi.string().required().email().min(2).max(100),
  password: Joi.string().required().min(2).max(100),
});

// USER /api/auth/register - Thêm người dùng mới
userRouter.post("/register", async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: "Lỗi khi thêm người dùng",
        details: error.details.map((err) => err.message),
      });
    }
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        message: `Đã tồn tại ${req.body.email}, vui lòng đổi email khác`,
      });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;
    const newUser = await User.create(req.body);
    newUser.password = undefined;
    const token = jwt.sign({ id: newUser._id }, "khoa", {
      expiresIn: "5h",
    });

    return res.status(201).json({
      user: newUser,
      accessToken: token,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Lỗi khi thêm người dùng", message: err.message });
  }
});

export default userRouter;
