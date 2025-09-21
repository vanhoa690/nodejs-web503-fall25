import express from "express";
import router from "./routers";

const app = express();

app.use("/", router);
// app.use("/api/v2", router);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
