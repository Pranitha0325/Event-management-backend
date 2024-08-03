const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/userDetails");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, "emailoftheuser");

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: "Incorrect email" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ error: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signUp = async (req, res) => {
  const { email, password, userName, mobileNumber } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const hashGenerate = async (plainpassword) => {
    try {
      const salt = await bcryptjs.genSalt(saltRounds);
      const hash = await bcryptjs.hash(plainpassword, salt);
      return hash;
    } catch (error) {
      return error;
    }
  };

  const hashPass = await hashGenerate(password);
  try {
    const result = await User.create({
      email: email,
      password: hashPass,
      userName: userName,
      mobileNumber: mobileNumber,
    });
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { login, signUp };
