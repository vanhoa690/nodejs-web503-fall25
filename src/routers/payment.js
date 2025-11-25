import { Router } from "express";
import { paymentVnpay } from "../controllers/payment";

const paymentRouter = Router();
paymentRouter.post("/vnpay", paymentVnpay);

export default paymentRouter;
