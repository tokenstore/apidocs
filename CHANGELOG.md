# Changelog

All notable changes to The Token Store's API will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2018-06-14
### Deprecated
* `https://v1.api.token.store`. Please use `https://v1-1.api.token.store`
### Changed
* `https://v1.api.token.store` => `https://v1-1.api.token.store`
* GET `https://v1-1.api.token.store/orderbook?pair=<pair>` => GET `https://v1-1.api.token.store/orderbook/{pair}`. Now, pair can have *ETH* both before and after the token symbol. For example, *ETH_EVN* and *EVN_ETH* are valid pairs.
* GET `https://v1-1.api.token.store/orderbook/{pair}` payload changed
from
```
{
  "bids": [[0.0028555, 22], [0.0028, 4]],
  "asks": [[0.345, 0.345], [0.35, 1.20085]]
}
```
to
```
{
  "bids": [
    { price: 0.0028555, volume: 22 },
    { price: 0.0028, volume: 4 }
  ],
  "asks": [
    { price: 0.345, volume: 0.345 },
    { price: 0.35, volume: 1.20085 }
  ]
}
```
### Fixed
* GET `https://v1-1.api.token.store/api/trades` and GET `https://v1.api.token.store/api/trades/{id}` - has the corrected *type* for trades. Before it was wrong.
* GET `https://v1-1.api.token.store/orderbook/{pair}` - returns *volume* in tokens units for bids and asks. Before it was tokens unit for bids and Ethereum unit for asks.

## [1.0.0] - 2018-05-11
### Deprecated
* `https://token.store/api`
* `https://api.token.store/public`
### Changed
* GET `https://token.store/api/ticker` => GET `https://v1.api.token.store/ticker`
* GET `https://token.store/api/trades` => GET `https://v1.api.token.store/trades`
* GET `https://token.store/api/pairs` => GET `https://v1.api.token.store/pairs`
* GET `https://token.store/api/orderbook?pair=<pair>` => GET `https://v1.api.token.store/orderbook?pair=<pair>`
### Added
* GET `https://v1.api.token.store/ticker` - Return config including fee, minOrderSize, blockNumber
* GET `https://v1.api.token.store/contract` - Return contract abis and address
* GET `https://v1.api.token.store/orders` - Provide all active orders ordered by created time
* POST `https://v1.api.token.store/orders` - Create new order
* GET `https://v1.api.token.store/orders/{id}` - Provide infomation for single order including not an order that is not active
* POST `https://v1.api.token.store/orders/{id}/cancel` - Used for send cancel order transaction. Function *cancelOrder* from our contract should be used generating the signature.
* POST `https://v1.api.token.store/api/trades` - Create trade for the order with number orderId from payload. Function *trade* from our contract should be used generating the signature.
* GET `https://v1.api.token.store/api/trades/{id}` - Provide infomation for single trade
* GET `https://v1.api.token.store/accounts/{account}` - Provide information required for making solidity function request for specific address
* GET `https://v1.api.token.store/accounts/{account}/balances` - Return balance for provided tokens
* POST `https://v1.api.token.store/accounts/{account}/deposit` - Deposit Ethereum or a token to smart contract via API. Function *deposit* or *depositToken* from our contract should be used generating the signature.
* POST `https://v1.api.token.store/accounts/{account}/withdraw` - Withdraw Ethereum or a token to smart contract via API. Function *withdraw* or *withdrawToken* from our contract should be used generating the signature.

## [0.x] - 2018-03-27
### Added
* GET `https://token.store/api/ticker` - Returns 24h trade volume and the last price for each coin.
* GET `https://token.store/api/trades` - Return historical trades executed
* GET `https://token.store/api/pairs` - Get list of pairs
* GET `https://token.store/api/orderbook?pair=<pair>` - Orderbook for a pair
