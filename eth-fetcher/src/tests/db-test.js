const assert = require('assert');
const { DatabaseService } = require('../data-access/services/database-service');

describe('DatabaseService', function() {
    const dbService = new DatabaseService(require('../data-access/db/db-pool'));

    it('should add and retrieve a transaction', async function() {
        const txHash = '0x1234567890abcdef3';
        const data = { some: 'data3' };
        await dbService.writeTxData(txHash, data);
        const retrievedData = await dbService.readTxData(txHash);
        assert.deepStrictEqual(retrievedData, data);
    });

    it('should add and retrieve a user', async function() {
        const username = 'testuser1';
        const password = 'testpassword1';
        await dbService.addUser(username, password);
        const retrievedUser = await dbService.getUser(username);
        assert.strictEqual(retrievedUser.username, username);
        assert.strictEqual(retrievedUser.password, password);
    });

    it('should update a user\'s transactions', async function() {
        const username = 'testuser12';
        const txHash = '0x1234567890abcdef12';
        await dbService.addUserLog(username, []);
        await dbService.updateUserTransactions(username, txHash);
        const retrievedTxHashes = await dbService.getAllUserTransactions(username);
        assert.deepStrictEqual(retrievedTxHashes[0], txHash);
    });

    // Not finished
});