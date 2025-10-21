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
    password: String,
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
    return res.json("Khong xac thuc duoc1");
  }
  // so sanh password
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.json("Khong xac thuc duoc2");
  }
  // gen token
  const token = jwt.sign({ id: user._id }, "khoa", { expiresIn: "1h" });
  res.json({ message: "Login success", token });
});

const uploadSchema = new mongoose.Schema(
  {
    image: String,
  },
  { timestamps: true, versionKey: false }
);

const Upload = mongoose.model("Upload", uploadSchema);
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  // khai báo nơi lưu trữ file
  destination: (req, file, callback) => {
    callback(null, "src/uploads");
  },
  // xử lý đổi tên file
  filename: (req, file, callback) => {
    const filename = Date.now() + path.extname(file.originalname);
    req.body.image = filename;
    callback(null, filename);
  },
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("image"), async function (req, res) {
  try {
    const upload = await Upload.create({ image: req.body.image });

    upload.image = `http://localhost:3000/${upload.image}`;

    return res.status(201).json({
      message: "Upload thành công",
      data: upload,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
