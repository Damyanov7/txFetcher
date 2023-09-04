const { generateJwtSecret } = require('./gen-secret');
const { createTransactionsTable, 
    createUsersTableAndAddUsers, 
    createUserTransactionsTableWithUsers } = require('./create-tables');

generateJwtSecret();
createTransactionsTable();
createUsersTableAndAddUsers();
createUserTransactionsTableWithUsers();