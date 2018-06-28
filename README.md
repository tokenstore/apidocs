# <img src="https://avatars2.githubusercontent.com/u/29560114?s=24&v=4"> The Token Store Public API

[![specification](https://img.shields.io/badge/raml-1.0-blue.svg)](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md/)
[![Join our telegram group!](https://img.shields.io/badge/telegram-@thetokenstore-32a2da.svg)](https://telegram.me/thetokenstore)


### What is [token.store](https://token.store):

- The Token Store is a decentralized exchange built on smart contracts that lets you trade ERC20 (and some ERC223) tokens against Ethereum.
- You can find more information about our fees [here.](https://token.store/fees)
- Our [solidity contract ](https://github.com/tokenstore/contract) is published at [0x1cE7AE555139c5EF5A57CC8d814a867ee6Ee33D8](https://etherscan.io/address/0x1ce7ae555139c5ef5a57cc8d814a867ee6ee33d8#code).
- You can trade tokens both by symbol and contract address.

### REST API

The Base URL is [https://v1-1.api.token.store](https://v1-1.api.token.store). At this endpoint we have [documentation](https://docs.api.token.store) generated from  [api-v1-1.raml](api-v1-1.raml)

We use RAML 1.0 for specification. You can use it to automatically generate documentation/client/mocks/etc. You can read more about RAML at [raml.org](https://raml.org/)

### Example usage

- Example for [node.js](bots-example/js/)

### Tools

- [order signer](https://www.npmjs.com/package/@token.store/ethjs-order-signer)
- [ethereumjs-util](https://www.npmjs.com/package/ethereumjs-util)

## FAQ

#### Your API responds with a 400 code

This error means your call has wrong payload. We advise the following steps:

1. Check payload example in our specification.
2. Make sure you're using the right function from our contract to generate the message for signing.
3. Feel free to open an issue here with some example code so we can help you out -- but be careful with your private keys!

#### Your API responds with a 502 code

This error shows that your transaction doesn't approved by our Ethereum node. We advise the following steps:

1. Check the error message! Usually it has all required information to fix the error.
2. Check your account balance. Do you have enough Ethereum for gas payment?
3. Check your nonce. You can use our endpoint `/accounts/{account}` for recieving the recommended nonce for your account.

#### My transaction takes too long to process. Could you help me?

Nope. Every transaction is processed on Ethereum blockchain. Please, use more gas!

#### Do you have different protocols like WebSockets, JSON-RPC, GraphQL?

Not yet -- but please feel free to open a feature request here!

#### Could I have support?

If you have developer request, then please open an issue here.

If you need help with the product, then our [telegram chanel](https://telegram.me/thetokenstore) is the best place for that. You can also email support@token.store for complex queries.
