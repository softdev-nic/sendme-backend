const RegUser = require("../Models/RegSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
    console.log(req.headers['content-type']);
  try {
    const { username, password, dob } = req.body;
    
    // Create a new user instance
    const newUser = new RegUser({
      username,
      password: await bcrypt.hash(password, 10),
      dob,
    });


    // Save the user to the database
    await newUser.save();
    jwt.sign(
      { user: { id: newUser._id } },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ message: "User registered successfully", token, user: newUser });
      }
    );      
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
