const RegUser = require("../Models/RegSchema")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const LoginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await RegUser.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  }
    catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = LoginUser;
