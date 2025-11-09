import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "Anonymous",
    unique: true,
  },
    email: {
    type: String,
    required: true,
    unique: true,
  },
    password: {
    type: String,
    required: true,
    },
    bio: {  
    type: String,
    default: "",
    },
    photoUrl : {
    type: String,
    default: "",
    }

}, { timestamps: true });

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        // Here you can add password hashing logic if needed
    }
    next();
});

const User = mongoose.model("User", userSchema);
export default User;
