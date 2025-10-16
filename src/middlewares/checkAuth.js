import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(403).json({ message: "Thiếu header" });
  }

  const token = header.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Access Denied checkAuth" });

  try {
    const decoded = jwt.verify(token, "khoa");
    console.log({ decoded });

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(roles, req.user);
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};
