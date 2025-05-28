const jwt = require("jsonwebtoken");
const User = require('../models/user.models')
require("dotenv").config();

const generaterefreshToken = async(userId) => {
  const token = await jwt.sign({ id: userId },
     process.env.REFRESH_TOKEN,
      {
    expiresIn: "10d",}
  );

  const updateRefreshToken = await User.updateOne(
    { _id: userId },
    { refresh_token: token }
  );

  return token;
};

module.exports = generaterefreshToken;
