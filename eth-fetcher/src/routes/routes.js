// Internal imports
const { Router } = require('express');
const { Controller } = require('../controllers/controller');
const { DatabaseService } = require('../data-access/services/database-service');
const { BlockchainService } = require('../data-access/services/blockchain-service');
const { AuthService } = require('../data-access/services/auth-service');

// Load environment variables
require('dotenv').config();

// Instantiate classes and instances
const Web3 = require('web3');
const databaseService = new DatabaseService(require('../data-access/db/db-pool'));
const blockchainService = new BlockchainService(new Web3(process.env.ETH_NODE_URL));
const authService = new AuthService(databaseService);
const controller = new Controller(databaseService, blockchainService, authService);

const router = Router();

router.get('/eth/:rlphex', controller.getTx);
router.get('/all', controller.getAll);
router.post('/authenticate', controller.auth);
router.get('/my', controller.getUsrTx);

module.exports = router;