import axios from "axios";
import moment from "moment";
import CryptoJS from "crypto-js";

const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

export const paymentZalo = async (req, res) => {
  const { amount } = req.body;

  const transID = Math.floor(Math.random() * 1000000);

  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
    app_user: "user123",
    app_time: Date.now(),
    item: JSON.stringify([{}]),
    embed_data: JSON.stringify({
      preferred_payment_method: ["zalopayapp"],
      redirecturl: "http://localhost:5173/payment-result?paymentMethod=zalopay",
    }),
    amount,
    description: "ZaloPay Integration Demo",
    bank_code: "",
    callback_url: "https://d769-123-16-125-218.ngrok-free.app/zalo/callback",
  };

  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;

  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const response = await axios.post(
      config.endpoint,
      new URLSearchParams(order).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
