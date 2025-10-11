import express from "express";
// import Joi from "joi";
import mongoose from "mongoose";
import postRouter from "./routers/post";
import authorRouter from "./routers/author";
import bcrypt from "bcryptjs";

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/nodejs")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use("/api/posts", postRouter);

app.use("/api/authors", authorRouter);

//------------------------------
// Register User
//1 Model User
const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

// 2. Route: api/auth/register
app.post("/api/auth/register", async (req, res) => {
  const userExisted = await User.findOne({ email: req.body.email });

  if (userExisted) {
    return res.json("Error: user da ton tai");
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);

  const newUser = await User.create(req.body);
  res.json(newUser);
});
// -----------------------------

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
