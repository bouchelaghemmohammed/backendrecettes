import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

export default function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);
    
    req.user = {
      id: payload.id || payload.userId || payload.sub,
      username: payload.username || payload.name || null,
      ...payload
    };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}