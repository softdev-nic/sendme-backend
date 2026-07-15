const express = require("express");
const connectDB = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const RegisterUser = require("./Controllers/registration");
const auth = require("./Middleware/Auth");
const LoginUser = require("./Controllers/LoginUser");
// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
connectDB();


// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.post("/api/register", RegisterUser.registerUser);
app.post("/api/login", LoginUser);
 app.get("/api/validate-user", auth, async(req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
}); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
