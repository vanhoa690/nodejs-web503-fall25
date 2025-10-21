import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/kiemtra_nodejs_fa25")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Model Course
const courseSchema = new mongoose.Schema(
  {
    courseName: String,
    views: Number,
    thumbnail: String,
    note: String,
    category: String,
  },
  {
    timestamps: true,
  }
);

const Course = new mongoose.model("Course", courseSchema);

// Routes
app.get("/courses", async function (req, res) {
  const courses = await Course.find();
  res.json(courses);
});
app.post("/courses", async function (req, res) {
  const courses = await Course.create(req.body);
  res.json(courses);
});
app.get("/courses/:id", async function (req, res) {
  const course = await Course.findById(req.params.id);
  res.json(course);
});
app.put("/courses/:id", async function (req, res) {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(course);
});
app.delete("/courses/:id", async function (req, res) {
  await Course.findByIdAndDelete(req.params.id);
  res.json("delete done");
});

// Model Course
const userSchema = new mongoose.Schema(
  {
    email: String,
    password: Number,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", userSchema);

// Routes api/auth

app.post("/auth/register", async function (req, res) {
  // check user existed
  const userExisted = await await User.findOne({ email: req.body.email });
  if (userExisted) {
    return res.json("User ton tai");
  }
  // hash password
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await User.create({
    email: req.body.email,
    password: hashPassword,
  });
  res.json(newUser);
});

app.post("/auth/login", async function (req, res) {
  // check email user
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json("Khong xac thuc duoc");
  }
  // so sanh password
  const isMatch = await bcrypt.compare(user.password, req.body.password);
  if (!isMatch) {
    return res.json("Khong xac thuc duoc");
  }
  // gen token
  const token = jwt.sign({ id: user._id }, "khoa", { expiresIn: "1h" });
  res.json({ message: "Login success", token });
});
app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
