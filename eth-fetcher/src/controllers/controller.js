class Controller {
    constructor(databaseService, blockchainService, authService) {
        this.databaseService = databaseService;
        this.blockchainService = blockchainService;
        this.authService = authService;
    }

    getTx = async (req, res) => {
        try {
            let username;
            const txHashes = await this.blockchainService.rlpToTxHashArray(req.params.rlphex);
            let txData = [];
            const authToken = req.headers['authorization'];
    
            for (const txHash of txHashes) {
                let data = await this.databaseService.readTxData(txHash);
                if (!data) {
                    data = await this.blockchainService.readTxData(txHash);
                    if (!data) {
                        throw new Error(`Failed to fetch data from blockchain for ${txHash}`);
                    }
                    await this.databaseService.writeTxData(txHash, data);
                }
                txData.push(data);

                if (authToken) {
                    username = await this.authService.getUsernameFromToken(authToken);
                    await this.databaseService.updateUserTransactions(username, txHash);
                }
            }
    
            res.status(200).json({ transactions: txData });
        } catch (err) {
            console.error(err);
            res.status(400).json({error:err.message});
        }
    }

    // Fetching all txInfos from the DB
    getAll = async (req, res) => {
        try {
            const response = await this.databaseService.readTxDataAll();
            res.status(200).json(response);
        } catch (err) {
            console.error(err);
            res.status(400).json({error:err.message});
        }
    }

    auth = async (req, res) => {
        try {
          const { username, password } = req.body;
          const token = await this.authService.authenticateUser(username, password);
          res.status(200).json(token);
        } catch (error) {
          console.error(error);
          res.status(400).json({ error: error.message });
        }
    }

    getUsrTx = async (req, res) => {
        try {
            const authToken = req.headers['authorization'];
            const username = await this.authService.getUsernameFromToken(authToken);
            const userTransactions = await this.databaseService.getAllUserTransactions(username); // fetching list of tx hashes for a user
            const txData = [];
    
            for (const txHash of userTransactions) {
                let data = await this.databaseService.readTxData(txHash);
                if (data) {
                    txData.push(data);
                }
            }
            res.status(200).json({ transactions: txData });
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = { 
    Controller,
}