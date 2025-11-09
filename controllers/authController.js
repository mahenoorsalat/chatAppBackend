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


    const hashPassword = await bcrypt.hash(password, 10);
    
    
    const newUser = new User({ username, email, password : hashPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
   }
   catch(error){
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error" });
   }    
};

export const getUserProfile = async (req, res) => {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    }
    catch(error){

        console.error("Get profile error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
export const updateUserProfile = async (req, res) => {
    try{
        const userId = req.params.id;
        const { username, bio, photoUrl } = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        } 
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.photoUrl = photoUrl || user.photoUrl;  
        await user.save();
        return res.status(200).json({ message: "Profile updated successfully" });
    }
    catch(error){
        console.error("Update profile error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
