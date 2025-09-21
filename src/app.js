import express from "express";
import morgan from "morgan";

import router from "./routers";

const app = express();

// Dùng morgan để log ở chế độ 'dev'
app.use(morgan("dev"));

// Middleware tích hợp để parse JSON: req.body
app.use(express.json());

app.use("/", router);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
