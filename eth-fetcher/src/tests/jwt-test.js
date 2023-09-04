const { DatabaseService } = require('../data-access/services/database-service');
const { AuthService } = require('../data-access/services/auth-service');
const assert = require('assert');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const databaseService = new DatabaseService(require('../data-access/db/db-pool'));
const authService = new AuthService(databaseService);

describe('AuthService', () => {
  describe('createToken', () => {
    it('should generate a valid JWT token', async () => {
      const user = { username: 'testuser' };
      const expectedPayload = { username: 'testuser' };
      const expectedSecret = process.env.JWT_SECRET;

      const result = await authService.createToken(user);

      assert.strictEqual(result.statusCode, 200);
      assert.strictEqual(jwt.verify(result.token, expectedSecret).username, expectedPayload.username);
    });
  });
});