import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";

const verifyUserAuth = async (req, res, next) => {
  const token = req.cookies.courseX_token || req.headers.authorization;
  if (!token) {
    return res.status(401).json(new ApiError(401, "Please login"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).json(new ApiError(401, "Invalid token"));
  }
  req.user = user;
  next();
};

const verifyAdminAuth = async (req, res, next) => {
  const token = req.cookies.courseX_admin_token || req.headers.authorization;
  if (!token) {
    return res.status(401).json(new ApiError(401, "Please login"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const admin = await Admin.findOne({acessKey:decoded.acessKey,username:decoded.username});
  if (!admin) {
    return res.status(401).json(new ApiError(401, "Invalid token"));
  }
  req.admin = admin;
  next();
};

export { verifyUserAuth, verifyAdminAuth };