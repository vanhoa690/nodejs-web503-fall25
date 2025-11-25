import qs from "querystring";
import crypto from "crypto";
import moment from "moment";

const config = {
  vnp_TmnCode: process.env.VNP_TMN_CODE || "MTV05YVA",
  vnp_HashSecret:
    process.env.VNP_HASH_SECRET || "PBNLKF8YGRNCPXLDJLY9V1023CW8206U",
  vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_ReturnUrl:
    process.env.VNP_RETURN_URL || "http://localhost:5173/payment-result",
  vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
};

// Utility function to sort object parameters
function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((sorted, key) => {
      sorted[key] = obj[key];
      return sorted;
    }, {});
}

// Validate payment parameters
function validatePaymentParams(amount, bankCode) {
  const errors = [];

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    errors.push("Amount must be a positive number");
  }

  if (bankCode && typeof bankCode !== "string") {
    errors.push("Bank code must be a string");
  }

  return errors;
}
export const paymentVnpay = (req, res) => {
  try {
    const { amount, bankCode = "NCB", language = "vn" } = req.body;
    console.log({ amount });

    // Validate input
    const validationErrors = validatePaymentParams(amount, bankCode);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        details: validationErrors,
      });
    }

    const ipAddr = req.ip;

    const orderId = moment().format("YYYYMMDDHHmmss");
    const createDate = moment().format("YYYYMMDDHHmmss");

    const vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: config.vnp_TmnCode,
      vnp_Locale: language,
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh_toan_don_hang_${orderId}`,
      vnp_OrderType: "billpayment",
      vnp_Amount: Math.round(Number(amount) * 100), // Convert to cents
      vnp_ReturnUrl: config.vnp_ReturnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    // Add bank code if provided
    if (bankCode && bankCode.trim() !== "") {
      vnp_Params.vnp_BankCode = bankCode.trim();
    }

    // Sort parameters and create secure hash
    // const sortedParams = sortObject(vnp_Params);
    // const signData = qs.stringify(sortedParams, { encode: false });
    // const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
    // const secureHash = hmac
    //   .update(Buffer.from(signData, "utf-8"))
    //   .digest("hex");

    // // Add secure hash to parameters
    // const finalParams = {
    //   ...sortedParams,
    //   vnp_SecureHash: secureHash,
    // };

    // // Create payment URL
    // const paymentUrl = `${config.vnp_Url}?${qs.stringify(finalParams)}`;
    let signData = qs.stringify(vnp_Params);
    let hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
    let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;

    let paymentUrl = config.vnp_Url + "?" + qs.stringify(vnp_Params);
    res.json({
      success: true,
      paymentUrl,
      orderId,
      amount: Number(amount),
    });
  } catch (error) {
    console.error("Create payment error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to create payment URL",
    });
  }
};
