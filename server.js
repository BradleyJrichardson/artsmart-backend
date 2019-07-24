const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
// listen on port 5000
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.DB_URL;

// defining some options to pass into connect
const options = {
  useNewUrlParser: true,
  family: 4
};

// database connection
mongoose
  .connect(mongoURI, options, err => {
    console.log("entered");
    if (err) {
      console.log(err);
      return;
    }
  })
  .then(() => {
    console.log("connected to mongoDB 🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿🤙🏿");
  });

app.listen(PORT, () => console.log("listening on port 5000"));
