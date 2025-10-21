import express from "express";
import mongoose from "mongoose";
import postRouter from "./routers/post";
import authorRouter from "./routers/author";

import authRouter from "./routers/auth";
import path from "path";
import { upload } from "./middlewares/upload";

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "uploads")));
mongoose
  .connect("mongodb://localhost:27017/nodejs")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use("/api/posts", postRouter);

app.use("/api/authors", authorRouter);

app.use("/api/auth", authRouter);

const uploadSchema = new mongoose.Schema(
  {
    image: String,
  },
  { timestamps: true, versionKey: false }
);

const Upload = mongoose.model("Upload", uploadSchema);

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
