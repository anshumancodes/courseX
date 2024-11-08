import User from "../models/User.model.js";
import ApiResponse from "../utils/Apiresponse.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";


// user login, signup, purchase a course, see course
const signup = async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res
      .status(400)
      .json(new ApiError(400, "Please provide all the fields"));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json(new ApiError(400, "User already exists"));
  }
  try {
    const user = await User.create({
      name,
      email,
      username,
      password,
    }).select("-password");

    return res
      .status(200)
      .json(new ApiResponse(200, "User created successfully", user));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "User creation failed"));
  }
};

const tokenegenerator=({payload})=>{
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json(new ApiError(400, "Please provide all the fields"));
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(new ApiError(400, "User not found"));
        }
        if (user.password !== password) {
            return res.status(400).json(new ApiError(400, "Invalid password"));
        }
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
        };
        const token = tokenegenerator({payload});
        
        res.setcookie("courseX_token",token,{httpOnly:true,secure:true});
        return res.status(200).json(new ApiResponse(200, "Login successful", user.select("-password")));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Login failed"));
        
    }
};

export { signup, login,tokenegenerator };
