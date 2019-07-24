const User = require("../models/User");
const { checkPassword, generateAccessToken } = require("../utils/auth-utils");

// login post endpoint
const login = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      console.log("in functions");
      const query = await User.findOne({ name: username });
      if (query !== null) {
        const result = await checkPassword(password, query.password);
        if (!result) {
          return res.status(403).send("incorrect credentials");
        } else {
          const token = await generateAccessToken(query);
          console.log(token);
          return res.send({ token });
        }
      } else {
        return res.status(403).send("incorrect credentials");
      }
    } catch (err) {
      return res.status(404).send("an error occurred");
    }
  } else {
    return res.status(403).send("incorrect credentials");
  }
};

module.exports = {
  login
};
