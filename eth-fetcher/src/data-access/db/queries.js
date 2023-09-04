const getAll = `
    SELECT s.data 
    FROM transactions s
`;

const getTx = `
    SELECT s.data 
    FROM transactions s 
    WHERE s.id = $1
`;

const addTx = `
    INSERT INTO transactions (id, data) 
    VALUES ($1, $2)
`;

const addUser = `
    INSERT INTO users (username, password) 
    VALUES ($1, $2)
`;

const getUser = `
    SELECT * 
    FROM users 
    WHERE username = $1
`;

const addUserTransaction = `
    INSERT INTO user_transactions 
    (username, tx_hashes) 
    VALUES ($1, $2)`
;

const updateUserLog = `
    UPDATE user_transactions 
    SET tx_hashes = array_append(tx_hashes, $1)
    WHERE username = $2 AND NOT EXISTS (SELECT 1 FROM unnest(tx_hashes) WHERE unnest = $1)
`;

const getUserTransactions = `
    SELECT tx_hashes
    FROM user_transactions
    WHERE username = $1
`;

module.exports = {
    getAll,
    getTx,
    addTx,
    addUser,
    getUser,
    addUserTransaction,
    updateUserLog,
    getUserTransactions,
};