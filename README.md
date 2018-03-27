# apidocs
REST API docs for https://api.token.store

### `/public/v1/ticker`
Returns 24h trade volume and the last price for each coin.

#### Sample output:
```
{
  "ETH_TTT":{
    "tokenAddr":"0xf3bc4a5abbb9ffa56c84d27f167e7257c64bd0b2",
    "quoteVolume":18,
    "baseVolume":6.050000000000001,
    "last":0.15,
    "bid":0.3,
    "ask":0.15,
    "percentChange":-90.54688681639148
  }
}
```

### `/public/v1/trades`
Historical trades
Return historical trades executed. Trades returned in ascending order. Option available to query historical trades based on tradeID, default is
to return latest 100 trades

#### Params

|Name        | Type                 | Example                                             | Description
|------------|----------------------|-----------------------------------------------------|----------------------------
|pair        | String               | ETH_EOS                                             | 
|fromId      | Number               | 123                                                 | query by tradeID, display trades after this ID inclusive (optional, default to return latest trades)
|limit       | Integer              | 200                                                 | number of trades returned (optional, default to 100)
|order       | String (asc or desc) | desc                                                | order which items returned in (default to desc)

#### Sample input: 

`GET /public/v1/trades?pair=ETH_EOS&limit=20&fromId=123` 

#### Sample output:
```
[
   {
      "id":123,
      "timestamp":1520797156,
      "createdAt":"2018-03-11T19:39:16.967Z",
      "baseAmount":0.01,
      "price":2,
      "type":"sell",
      "tokenGet":"ETH",
      "tokenGive":"EOS"
   },
   {
      "id":123,
      "timestamp":1520797166,
      "createdAt":"2018-03-11T19:39:26.011Z",
      "baseAmount":0.01,
      "price":2,
      "type":"sell",
      "tokenGet":"ETH",
      "tokenGive":"EOS"
   }
]
```

### `/public/v1/pairs`

Get list of pairs

#### Sample output

```
[  
   {  
      "id":"ETH_EGR",
      "fromSymbol":"ETH",
      "toSymbol":"EGR"
   },
   {  
      "id":"ETH_BAS",
      "fromSymbol":"ETH",
      "toSymbol":"BAS"
   }
]
```

### `/public/v1/orderbook?pair=:pair`

Orderbook for pair. Returns price->volume pairs.

#### Params

|Name        | Type         | Example                                             | Description
|------------|--------------|-----------------------------------------------------|----------------------------
|pair        | String       | ETH_EOS (required)                                           | 
|depth       | Integer      | 10                                                  | number of orders returned per type (asks/bids) (optional, default to 100)

#### Sample input: 

`GET /public/v1/orderbook?pair=ETH_EOS&depth=10` 

#### Sample output

```
{"bids":[[0.5,400],[0.45,100], ...],"asks":[[0.9,120],[0.85,190]]}
```
