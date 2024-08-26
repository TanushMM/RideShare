require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(express.json()); // To parse JSON data

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/", { // process.env.MONGO_URL1
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Check for connection success
db.on("connected", () => {
  console.log("MongoDB connection established successfully");
});

// Check for connection error
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Define Mongoose schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Define Mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);

// Route to fetch users and admins
app.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    const admins = await Admin.find(); // Fetch all admins
    res.json({ users, admins });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to handle login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, " ", password);

  try {
    let user = null;

    if (email.includes("@hexaware.admin")) {
      user = await Admin.findOne({ email, password });
    } else if (email.includes("@hexaware.user")) {
      user = await User.findOne({ email, password });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Request JWT from /getJWT
    try {
      const response = await axios.post('http://127.0.0.1:5000/getJWT', {
        jwt: user.email // Or use another value if needed
      });

      const totalServerAccessToken = response.data.total_server_access_token;

      // Send both user info and JWT to the client
      res.json({
        message: "Login successful",
        user,
        token: totalServerAccessToken
      });
    } catch (error) {
      console.error("Error fetching JWT:", error);
      res.status(500).json({ message: "Error fetching JWT" });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// // Route to handle login
// // When a login is initiated, the logic is that it must contact /getJWT and get a JWT 
// // which is stoed in the browser itself and it can used for further calls to the backend
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     let user = null;

//     if (email.includes("@hexaware.admin")) {
//       user = await Admin.findOne({ email, password });
//     } else if (email.includes("@hexaware.user")) {
//       user = await User.findOne({ email, password });
//     }

//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     res.json({ message: "Login successful", user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Route to handle registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let data = await User.findOne({ email });
  console.log("Data is already present in the DB: ", data);

  if (data) {
    return res.status(403).json({ message: "User already registered" });
  }

  let newUserOrAdmin;

  if (email.includes("@hexaware.admin")) {
    newUserOrAdmin = new Admin({ name, email, password });
  } else if (email.includes("@hexaware.user")) {
    newUserOrAdmin = new User({ name, email, password });
  } else {
    return res.status(400).json({ message: "Invalid email domain." });
  }

  try {
    const savedUserOrAdmin = await newUserOrAdmin.save();
    console.log(savedUserOrAdmin);
    const newData = ({
      ...savedUserOrAdmin._doc,
      _id: savedUserOrAdmin._id.toString(),
    });
    console.log("after registration:", newData);
    res.status(201).json(newData);
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(9000, () => {
  console.log("Server listening at port:", 9000);
});