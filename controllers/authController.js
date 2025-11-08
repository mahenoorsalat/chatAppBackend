import User from "../models/userModels.js";

import bcrypt from "bcrypt";
export const loginUser = async (req, res) => {
  try{
      const {email , password} = req.body;

    if(!email || !password) {
        return  res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
      
     if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }   

 return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  }
  catch(error){
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }

}   ;

export const registerUser = async (req, res) => {
   try{
     const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }


    const hashPassword = bcrypt.hash(password, 10);
    
    
    const newUser = new User({ username, email, password : hashPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
   }
   catch(error){
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error" });
   }    
};