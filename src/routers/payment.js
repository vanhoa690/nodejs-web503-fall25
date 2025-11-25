import { Router } from "express";
import { paymentVnpay } from "../controllers/payment";
import { paymentZalo } from "../controllers/zalopay";

const paymentRouter = Router();
paymentRouter.post("/vnpay", paymentVnpay);
paymentRouter.post("/zalopay", paymentZalo);

export default paymentRouter;
