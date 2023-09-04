const queries = require('../db/queries');

class DatabaseService {
    constructor(pool) {
        this.pool = pool;
    }

    async readTxData(txHash) {
        try {
            const { rows } = await this.pool.query(queries.getTx, [txHash]);
            if (rows.length) {
                const { data } = rows[0];
                console.log(`Successfully retrieved transaction data for ${txHash} from the database`);
                return data;
            } else {
                console.log(`Transaction ${txHash} was not found in the database`);
            }
        } catch (error) {
            console.error(`Error occurred while reading transaction data for ${txHash}: ${error.message}`);
            throw new Error('Failed to read transaction data from the database');
        }
    }

    async writeTxData(txHash, data) {
        try {
            await this.pool.query(queries.addTx, [txHash, data]);
            console.log(`Successfully added transaction ${txHash} to the database`);
        } catch (error) {
            console.error(`Error occurred while writing transaction data for ${txHash}: ${error.message}`);
            throw new Error('Failed to write transaction data to the database');
        }
    }

    async readTxDataAll() {
        try {
            const { rows } = await this.pool.query(queries.getAll);
            const transactions = rows.map(({ data }) => data);
            console.log(`Successfully retrieved all transactions from the database`);
            return { transactions };
        } catch (error) {
            console.error(`Error occurred while reading transaction data from the database: ${error.message}`);
            throw new Error('Failed to read transaction data from the database');
        }
    }

    async addUser(username, password) {
        try {
            await this.pool.query(queries.addUser, [username, password]);
            console.log(`Successfully added user ${username} to users`);
        } catch (error) {
            console.error(`Error occurred while adding user ${username} to the database: ${error.message}`);
            throw new Error('Failed to add user to the database');
        }
    }

    async getUser(username) {
        console.log("here");
        try {
            const { rows } = await this.pool.query(queries.getUser, [username]);
            if (rows.length) {
                const { id, username, password } = rows[0];
                console.log(`Successfully retrieved user ${username} from the database`);
                return { id, username, password };
            } else {
                console.log(`User ${username} was not found in the database`);
            }
        } catch (error) {
            console.error(`Error occurred while getting user ${username} from the database: ${error.message}`);
            throw new Error('Failed to get user from the database');
        }
    }

    async addUserLog(username) {
        try {
            await this.pool.query(queries.addUserTransaction, [username, []]);
            console.log(`Initialized ${username}'s transactions in user_transactions`);
        } catch (error) {
            console.error(`Error occurred while adding an empty transaction array to user ${username}'s transactions in the database: ${error.message}`);
            throw new Error(`Failed to add transaction to user transactions in the database`);
        }
    }

    async updateUserTransactions(username, txHashes) {
        try {
            await this.pool.query(queries.updateUserLog, [txHashes, username]);
            console.log(`Successfully updated user ${username}'s transactions in the database`);
        } catch (error) {
            console.error(`Error occurred while updating user ${username}'s transactions in the database: ${error.message}`);
            throw new Error('Failed to update user transactions in the database');
        }
    }

    async getAllUserTransactions(username) {
        try {
            const { rows } = await this.pool.query(queries.getUserTransactions, [username]);
            console.log(`Successfully retrieved all transactions for user ${username} from the database`);
            return rows[0].tx_hashes;
        } catch (error) {
            console.error(`Error occurred while getting all transactions for user ${username} from the database: ${error.message}`);
            throw new Error('Failed to get user transactions from the database');
        }
    }
}

module.exports = {
    DatabaseService,
}