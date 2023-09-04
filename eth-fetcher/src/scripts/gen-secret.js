const crypto = require('crypto');
const dotenv = require('dotenv');

function generateJwtSecret() {
    // Load environment variables from .env file
    dotenv.config();

    // Generate a new JWT_SECRET if it doesn't exist
    if (!process.env.JWT_SECRET) {
        const secret = crypto.randomBytes(32).toString('hex');
        process.env.JWT_SECRET = secret;
        console.log(`Generated new JWT_SECRET: ${secret}`);
    } else {
        console.log(`Using existing JWT_SECRET: ${process.env.JWT_SECRET}`);
    }
}

module.exports = {
    generateJwtSecret,
}