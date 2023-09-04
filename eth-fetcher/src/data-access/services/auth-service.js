const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthService {
    constructor(database) {
        this.database = database;
    }

    async createToken(user) { // Function is static because the instance doesn't matter
        console.log(`secret ${process.env.JWT_SECRET}`)
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        return { statusCode: 200, token };
    }

    async getUsernameFromToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //console.log(JSON.stringify(decoded));
            return decoded.username;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async authenticateUser(username, password) {
        try {
            const user = await this.database.getUser(username);
            if (!user || password !== user.password) {
                throw new Error('Invalid credentials');
            }
            const token = this.createToken(user);
            return token;
        } catch (error) {
            console.error(`Failed to authenticate user "${username}"`, error);
            throw new Error('Failed to authenticate user');
        }
    }
}

module.exports = {
    AuthService,
}