const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateAccesstoken = async(userId) => {
    const token = await jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

    return token;

    


}

module.exports = generateAccesstoken;