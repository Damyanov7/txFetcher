const RLP = require('rlp');

class BlockchainService {
    constructor(web3) {
        // web3 instance for interacting with the blockchain
        this.web3 = web3;
    }

    // Converts a RLP-encoded hex string to an array of transaction hashes
    rlpToTxHashArray = async (rlpHex) => {
        // Decode the RLP-encoded hex string and convert each hash to a string
        const txHashes = RLP.decode(Buffer.from(rlpHex, 'hex')).map(hash => hash.toString());
        return txHashes;
    }

    // Reads transaction data from the blockchain for a given transaction hash
    readTxData = async (txHash) => {
        try {
            // Get the transaction receipt and transaction object from the blockchain
            const receipt = await this.web3.eth.getTransactionReceipt(txHash);
            const tx = await this.web3.eth.getTransaction(txHash);

            // Extract relevant transaction data from the receipt and transaction object
            const txData = {
                transactionHash: receipt.transactionHash,
                transactionStatus: receipt.status,
                blockHash: receipt.blockHash,
                blockNumber: receipt.blockNumber,
                from: receipt.from,
                to: receipt.to,
                contractAddress: receipt.contractAddress,
                logsCount: receipt.logs.length,
                input: tx.input,
                value: tx.value,
            };

            console.log(`Successfully retrieved transaction data for ${txHash} from the blockchain`);

            return txData;
        } catch (error) {
            console.error(`Error fetching transaction data from blockchain for ${txHash}: ${txHash.message}`);
            return null;
        }
    }
}

module.exports = {
    BlockchainService,
}