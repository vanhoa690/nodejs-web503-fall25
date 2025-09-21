import express from "express";
import postRouter from "./routers/posts";
import router from "./routers";

const app = express();

app.use("/api/v1", router);
app.use("/api/v2", router);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
