const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateHash = async password => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const generateUser = async (username, password) => {
  console.log("test in genrate user");
  const hash = await generateHash("gusandmissy1996");
  const newUser = new User({
    name: "artsmartcraftcottage",
    password: hash
  });
  return await newUser.save();
};

const generateAccessToken = ({ name }) => {
  return jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = {
  checkPassword,
  generateUser,
  generateAccessToken
};
