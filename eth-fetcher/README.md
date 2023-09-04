- Architecture of the server - design decisions and overview
- How to run the server
- Requests and responses (with examples)

========================================================================================================================================
Architecture image can be found <project root directory>. 

Router <-> Controller <-> Service Layer & Data Access layer

Basic explanation:

Inside the Controller we'll be handling all stuff that is related to HTTP. 
That means we're dealing with requests and responses for our endpoints. 
Above that layer is Router, from Express, that passes requests to the corresponding controller.

The whole business logic will be in the Service Layer that exports certain services (methods) which are used by the controller.

The third layer is the Data Access Layer where we'll be working with our Database and the Blockchain.
========================================================================================================================================
Dependancies

dotenv: a zero-dependency module that loads environment variables from a .env file into process.env.

express: a popular Node.js web framework that provides a set of features for building web applications such as routing, middleware, and request handling.

nodemon: a tool that monitors changes in the source code and automatically restarts the server when it detects changes. 
This is useful for development to avoid the need for manually restarting the server after code changes.

pg: a PostgreSQL client for Node.js that allows you to interact with a PostgreSQL database from a Node.js application.

rlp: a library that provides methods for encoding and decoding data in Recursive Length Prefix (RLP) format.

web3: a library that provides a set of tools for interacting with the Ethereum blockchain, including sending transactions, managing accounts, and retrieving data.
========================================================================================================================================
To run the server install dependencies
npm install
npm start

This will first run the script for creating tables in our database (postgres)
NOTE: If there tables with the same name, they are gonna get deleted (not part of main design, test purposes)
Then it will start the server it self
========================================================================================================================================
Endpoints:

## Endpoint: `/lime/all`
## Endpoint: `/lime/eth/:rlphex`
## Endpoint: `/authenticate`
## Endpoint: `/my`

where in the 2nd end point rlphex stands for rlp encoded list of transactions
Example:

localhost{PORT}/lime/eth/f90110b842307839623266366133633265316165643263636366393262613636366332326430353361643064386135646137616131666435343737646364363537376234353234b842307835613537653330353163623932653264343832353135623037653762336431383531373232613734363534363537626436346131346333396361336639636632b842307837316239653262343464343034393863303861363239383866616337373664306561633062356239363133633337663966366639613462383838613862303537b842307863356639366266316235346433333134343235643233373962643737643765643465363434663763366538343961373438333230323862333238643464373938

which returns:

Response

```jsx
{
   "transactions":[
      {
         "transactionHash":"0x9b2f6a3c2e1aed2cccf92ba666c22d053ad0d8a5da7aa1fd5477dcd6577b4524",
         "transactionStatus":1,
         "blockHash":"0x3ac55cb392661e0d2239267022dc30f32dc4767cdacfd3e342443122b87101d3",
         "blockNumber":7976382,
         "from":"0xb4d6a98aa8cd5396069c2818adf4ae1a0384b43a",
         "to":null,
         "contractAddress":"0x3664f6c1178e19bb775b597d6584caa3b88a1c35",
         "input":"0x60806040523480156200001157600080fd5b506040518060400160405280600581526020017f4d794e46540000000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4e4654000000000000000000000000000000000000000000000000000000000081525081600090816200008f919062000412565b508060019081620000a1919062000412565b505050620000c4620000b8620000ca60201b60201c565b620000d260201b60201c565b620004f9565b600033905090565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200021a57607f821691505b60208210810362000230576200022f620001d2565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200029a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200025b565b620002a686836200025b565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620002f3620002ed620002e784620002be565b620002c8565b620002be565b9050919050565b6000819050919050565b6200.......(not displaying the whole op here)",
         "value":"0"
      },
      {
         "transactionHash":"0x5a57e3051cb92e2d482515b07e7b3d1851722a74654657bd64a14c39ca3f9cf2",
         "transactionStatus":1,
         "blockHash":"0x92557f7e29c39cae6be013ffc817620fcd5233b68405cdfc6e0b5528261e81e5",
         "blockNumber":7976373,
         "from":"0xf29a6c0f8ee500dc87d0d4eb8b26a6fac7a76767",
         "to":"0xb0428bf0d49eb5c2239a815b43e59e124b84e303",
         "contractAddress":null,
         "logsCount":0,
         "input":"0x",
         "value":"50000000000000000"
      },
      {
         "transactionHash":"0x71b9e2b44d40498c08a62988fac776d0eac0b5b9613c37f9f6f9a4b888a8b057",
         "transactionStatus":1,
         "blockHash":"0x32edca7a39d0b1fc3d19fd1487c3c69beadad7cdcd5e5f1c9e815e7d1c460a0d",
         "blockNumber":7957369,
         "from":"0x22ba753ca065d65d4d0b9f4fac7a669746175199",
         "to":"0x14cb06e8de2222912138f9a062e5a4d9f4821409",
         "contractAddress":null,
         "logsCount":3,
         "input":"0x95297e24a8d61b73377cdc07fcf0cdd5473a1c81d541d3bcbbac29dd02d9f680af901d705591dba920dde33e5f1043c1b84106b0f223e7b954b17bde9ffe62206b583b2d00000000000000000000000000000000000000000000000000000000000021d300eea48906338871c59f0d12348b85c66461cd8c9e80faa4d3e63b134279595a159d3bfa16088686ea5b2406f82109b60a5792b77bc173106c01f0fbfed6598905d63c4ca36d0740e427d53ea8d1cc707b15a846c854a14b2e3b2e30ce129b8721a54e650d0e077cf260d8c3c84a431b287bd35ffe4c03c27a19d9a0d3320ae905a76cdd5a8bfeffa1c837279d67654e053a8e80cf2e581968a93bf827c3cf702d8c881054165ebd6d1ebea052f9af3a10338c9314ed99609735b8b76fe274c411d32840d8a1f85b51ee84bd2b0d70fe5725362406ac200a1186ea82ae39731a05d84408b5eca5130fa799aa898bbb2132054dcd8890ff004ac855f57c813fc6",
         "value":"0"
      },
      {
         "transactionHash":"0xc5f96bf1b54d3314425d2379bd77d7ed4e644f7c6e849a74832028b328d4d798",
         "transactionStatus":0,
         "blockHash":"0x3ac55cb392661e0d2239267022dc30f32dc4767cdacfd3e342443122b87101d3",
         "blockNumber":7976382,
         "from":"0x58fa6ab2931b73a22d85617125b936bd3f74e765",
         "to":"0x302fd86163cb9ad5533b3952dafa3b633a82bc51",
         "contractAddress":null,
         "logsCount":0,
         "input":"0x97da873c0000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000058fa6ab2931b73a22d85617125b936bd3f74e76512d1a55b318c0be714e7ce8bc54a96ac48813cfcb73cbaa0a6e933fa9a35b7bb212c8f9a45c4430a6fa3cb8b67a28403c51e494615df4f826280256a8ddabde630818902818100e4dcd34866228be9255cbd322590b92ded49868321f0535734587348c4cb450d2d68367f686faa4688410662e9f38dc62a742f71d8e81b40a3c444381ee1245024467c8f29f04f0f83059dee234f1d4ab13e536eb5958adf91782ed3495b36fd5db6e76626771d998d6e4c75eceb58e1c783b33920dcd7723fbfbc33ba6d5ff902030100010000000000000000000000000000000000000000",
         "value":"1265249737905771"
      }
   ]
}
```


```jsx
curl -X GET http://127.0.0.1:{PORT}/lime/all
```

```jsx
{
      "transactions":[
         {
            "transactionHash":"0x9b2f6a3c2e1aed2cccf92ba666c22d053ad0d8a5da7aa1fd5477dcd6577b4524",
            "transactionStatus":1,
            "blockHash":"0x3ac55cb392661e0d2239267022dc30f32dc4767cdacfd3e342443122b87101d3",
            "blockNumber":7976382,
            "from":"0xb4d6a98aa8cd5396069c2818adf4ae1a0384b43a",
            "to":null,
            "contractAddress":"0x3664f6c1178e19bb775b597d6584caa3b88a1c35",
            "logsCount":1,
            "input":"0x60806040523480156200001157600080fd5b506040518060400160405280600581526020017f4d794e46540000000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4e4654000000000000000000000000000000000000000000000000000000000081525081600090816200008f919062000412565b508060019081620000a1919062000412565b505050620000c4620000b8620000ca60201b60201c565b620000d260201b60201c565b620004f9565b600033905090565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b71000000000000000.....................(not displaying the whole output here)",
            "value":"0"
         },
         {
            "transactionHash":"0x5a57e3051cb92e2d482515b07e7b3d1851722a74654657bd64a14c39ca3f9cf2",
            "transactionStatus":1,
            "blockHash":"0x92557f7e29c39cae6be013ffc817620fcd5233b68405cdfc6e0b5528261e81e5",
            "blockNumber":7976373,
            "from":"0xf29a6c0f8ee500dc87d0d4eb8b26a6fac7a76767",
            "to":"0xb0428bf0d49eb5c2239a815b43e59e124b84e303",
            "contractAddress":null,
            "logsCount":0,
            "input":"0x",
            "value":50000000000000000
         },
         {
            "transactionHash":"0x71b9e2b44d40498c08a62988fac776d0eac0b5b9613c37f9f6f9a4b888a8b057",
            "transactionStatus":1,
            "blockHash":"0x32edca7a39d0b1fc3d19fd1487c3c69beadad7cdcd5e5f1c9e815e7d1c460a0d",
            "blockNumber":7957369,
            "from":"0x22ba753ca065d65d4d0b9f4fac7a669746175199",
            "to":"0x14cb06e8de2222912138f9a062e5a4d9f4821409",
            "contractAddress":null,
            "logsCount":3,
            "input":"0x95297e24a8d61b73377cdc07fcf0cdd5473a1c81d541d3bcbbac29dd02d9f680af901d705591dba920dde33e5f1043c1b84106b0f223e7b954b17bde9ffe62206b583b2d00000000000000000000000000000000000000000000000000000000000021d300eea48906338871c59f0d12348b85c66461cd8c9e80faa4d3e63b134279595a159d3bfa16088686ea5b2406f82109b60a5792b77bc173106c01f0fbfed6598905d63c4ca36d0740e427d53ea8d1cc707b15a846c854a14b2e3b2e30ce129b8721a54e650d0e077cf260d8c3c84a431b287bd35ffe4c03c27a19d9a0d3320ae905a76cdd5a8bfeffa1c837279d67654e053a8e80cf2e581968a93bf827c3cf702d8c881054165ebd6d1ebea052f9af3a10338c9314ed99609735b8b76fe274c411d32840d8a1f85b51ee84bd2b0d70fe5725362406ac200a1186ea82ae39731a05d84408b5eca5130fa799aa898bbb2132054dcd8890ff004ac855f57c813fc6",
            "value":0
         },
         {
            "transactionHash":"0xc5f96bf1b54d3314425d2379bd77d7ed4e644f7c6e849a74832028b328d4d798",
            "transactionStatus":0,
            "blockHash":"0x3ac55cb392661e0d2239267022dc30f32dc4767cdacfd3e342443122b87101d3",
            "blockNumber":7976382,
            "from":"0x58fa6ab2931b73a22d85617125b936bd3f74e765",
            "to":"0x302fd86163cb9ad5533b3952dafa3b633a82bc51",
            "contractAddress":null,
            "logsCount":0,
            "input":"0x97da873c0000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000058fa6ab2931b73a22d85617125b936bd3f74e76512d1a55b318c0be714e7ce8bc54a96ac48813cfcb73cbaa0a6e933fa9a35b7bb212c8f9a45c4430a6fa3cb8b67a28403c51e494615df4f826280256a8ddabde630818902818100e4dcd34866228be9255cbd322590b92ded49868321f0535734587348c4cb450d2d68367f686faa4688410662e9f38dc62a742f71d8e81b40a3c444381ee1245024467c8f29f04f0f83059dee234f1d4ab13e536eb5958adf91782ed3495b36fd5db6e76626771d998d6e4c75eceb58e1c783b33920dcd7723fbfbc33ba6d5ff902030100010000000000000000000000000000000000000000",
            "value":1265249737905771
         }
      ]
}
