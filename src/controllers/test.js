// import qs from "querystring";
// import crypto from "crypto";
// import moment from "moment";

// function sortObject(obj) {
//   let sorted = {};
//   let keys = Object.keys(obj).sort();
//   keys.forEach((key) => {
//     sorted[key] = obj[key];
//   });
//   return sorted;
// }

// export const paymentVnpay = (req, res) => {
//   const { amount } = req.body;
//   const tmnCode = "HABDBT04"; // Lấy từ VNPay .env
//   const secretKey = "CEG8LLE82B62K3IJWIND4JOJM5X2IQF9"; // Lấy từ VNPay

//   const returnUrl = "http://localhost:5173/payment-result"; // Trang kết quả
//   const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

//   let ipAddr = req.ip;
//   let orderId = moment().format("YYYYMMDDHHmmss");
//   let bankCode = req.body.bankCode || "NCB";

//   let createDate = moment().format("YYYYMMDDHHmmss");
//   let orderInfo = "Thanh_toan_don_hang";
//   let locale = req.body.language || "vn";
//   let currCode = "VND";

//   let vnp_Params = {
//     vnp_Version: "2.1.0",
//     vnp_Command: "pay",
//     vnp_TmnCode: tmnCode,
//     vnp_Locale: locale,
//     vnp_CurrCode: currCode,
//     vnp_TxnRef: orderId,
//     vnp_OrderInfo: orderInfo,
//     vnp_OrderType: "billpayment",
//     vnp_Amount: amount * 100,
//     vnp_ReturnUrl: returnUrl,
//     vnp_IpAddr: ipAddr,
//     vnp_CreateDate: createDate,
//   };

//   if (bankCode !== "") {
//     vnp_Params["vnp_BankCode"] = bankCode;
//   }

//   vnp_Params = sortObject(vnp_Params);

//   let signData = qs.stringify(vnp_Params);
//   let hmac = crypto.createHmac("sha512", secretKey);
//   let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
//   vnp_Params["vnp_SecureHash"] = signed;

//   let paymentUrl = vnp_Url + "?" + qs.stringify(vnp_Params);
//   console.log(paymentUrl);

//   res.json({ paymentUrl });
// };
