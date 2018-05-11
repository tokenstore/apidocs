# <img src="https://avatars2.githubusercontent.com/u/29560114?s=24&v=4"> TOKEN STORE PUBLIC  API

[![specification](https://img.shields.io/badge/raml-1.0-blue.svg)](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md/)
[![Join the group on Telegram](https://img.shields.io/badge/telegram-@thetokenstore-32a2da.svg)](https://telegram.me/thetokenstore)


### What is [token.store](https://token.store):

- Token Store is a decentralized exchange built on smart contracts that offers trading in mostly ERC-20 tokens against Ethereum.
- We don't have fiat currencies and do not provide any leveraged trading.
- We have 0.3% fee for takers and fee-free for makers.
- Our [solidity contract ](https://github.com/tokenstore/contract) publiched at [0x1cE7AE555139c5EF5A57CC8d814a867ee6Ee33D8](https://etherscan.io/address/0x1ce7ae555139c5ef5a57cc8d814a867ee6ee33d8#code).
- You can tride token by symbol or address.

### REST API

Base URL is [https://v1.api.token.store](https://v1.api.token.store) At this endpoint we have [documentation](https://v1.api.token.store) generated from  [api.raml](api.raml)

We use raml 1.0 for specification. You can used it for auto generation documentation/client/mocks/etc. More about this format you can read at [raml.org](https://raml.org/)

### Example of usage

- Example for [node.js](bots-example/js/)

### Tools

- [order signer](https://www.npmjs.com/package/@token.store/ethjs-order-signer)
- [ethereumjs-util](https://www.npmjs.com/package/ethereumjs-util)

## FAQ

#### Your API sends me answer 400 code. Could you help me?

This error shows that you have wrong payload. Advises:

1. Check payload example in our specification.
2. Use right function from contact to generate the message for signing.
3. Be free, open issue with code example, but do not provide your public key.

#### Your API sends me answer 502 code. Could you help me?

This error shows that your transaction doesn't approved by our Ethereum node. Advises:

1. Check message. Usually it has all required information.
2. Check your account balance. Do you have enough Ethereum for gas payment?
3. Check your nonce. You can use our endpoint `/accounts/{account}` for reciving recomended nonce for your account.

#### My transaction is processed too long. Could you help me?

Nope. Every transaction is processed on Ethereum blockchain. Please, use more gas.

#### Do you have different protocols like WebSockets, JSON-RPC, GraphQL?

Please be free open feature request as issue to this repository.

#### Could I have support?

If you have develop request, then, please, open issue.

If you need help with the product, then our [telegram chanel](https://telegram.me/thetokenstore) is the best place for that.
