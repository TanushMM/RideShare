require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();



app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB connection established successfully");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

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

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);

app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    const admins = await Admin.find();
    res.json({ users, admins });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;

    if (email.includes("@hexaware.admin")) {
      user = await Admin.findOne({ email });
    } else if (email.includes("@hexaware.user")) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/getJWT', {
        jwt: user.email
      });

      const totalServerAccessToken = response.data.total_server_access_token;

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

app.listen(9000, () => {
  console.log("Server listening at port:", 9000);
});