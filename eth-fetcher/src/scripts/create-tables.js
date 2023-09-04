const pool = require('../data-access/db/db-pool');
const TableCreator = require('../data-access/db/table-creator');
const { DatabaseService } = require('../data-access/services/database-service');

const transactionsSchema = {
  tableName: 'transactions',
  columns: 'id VARCHAR(255) PRIMARY KEY, \
                data JSON',
};

const usersSchema = {
  tableName: 'users',
  columns: 'id SERIAL PRIMARY KEY, \
                username VARCHAR(50) UNIQUE NOT NULL, \
                password VARCHAR(50) NOT NULL',
};

const userTransactionsSchema = {
    tableName: 'user_transactions',
    columns: 'username VARCHAR(50) PRIMARY KEY, \
              tx_hashes TEXT[]',
};

const tableCreator = new TableCreator(pool);
const dbService = new DatabaseService(pool);

// Creating txs table
const createTransactionsTable = async () => {
  try {
    await tableCreator.init(transactionsSchema);
    await tableCreator.createIndex(transactionsSchema.tableName, 'id');
    console.log('Transactions table created successfully!');
  } catch (error) {
    console.error(`Failed to create transactions table: ${error.message}`);
  }
};

// Creating users table and adding users
const createUsersTableAndAddUsers = async () => {
  try {
    await tableCreator.init(usersSchema);
    const users = ['alice', 'bob', 'carol', 'dave'];
    for (const user of users) {
        await dbService.addUser(user, user);
    }
    console.log('Users added successfully!');
  } catch (error) {
    console.error(`Failed to create users table or add users: ${error.message}`);
  }
};

// Creating user_transactions table
const createUserTransactionsTableWithUsers = async () => {
    try {
        await tableCreator.init(userTransactionsSchema);
        console.log('User transactions table created successfully!');
        const users = ['alice', 'bob', 'carol', 'dave'];
        for (const user of users) {
            await dbService.addUserLog(user, []);
        }
        console.log('User transactions added successfully!');
    } catch (error) {
      console.error(`Failed to create user transactions table or add users: ${error.message}`);
    }
};

module.exports = {
    createTransactionsTable,
    createUsersTableAndAddUsers,
    createUserTransactionsTableWithUsers,
  };